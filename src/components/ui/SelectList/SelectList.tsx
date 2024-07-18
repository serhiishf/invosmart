import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  RefObject,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { findMatchByIncreasingDepth, MatchStrategy } from 'utils/searchUtils';
import { ComponentTheme, TextOverflow } from 'constants/theme';
import { KeyboardKey } from 'constants/keyboard';
import { SelectListProps } from './types';
import { OptionType } from 'types/common';
import styles from './SelectList.module.scss';
import { SelectListItem } from '../';

const SelectList = ({
  children,
  isLoading = false,
  options,
  topOptions,
  textOverflow = TextOverflow.Wrap,
  isHeightUnlimited = false,
  keyEvent,
  isSelectedMarked = true,
  typedMatchStrategy = MatchStrategy.StartWord,
  ariaLabel,
  componentTheme = ComponentTheme.Grey,
  onOptionSelect,
  selectedOption,
  ...rest
}: SelectListProps) => {
  const [typedText, setTypedText] = useState('');
  const combinedOptions = useMemo(() => {
    return [...(topOptions ?? []), ...(options ?? [])];
  }, [options, topOptions]);

  const indexSelectedValue = combinedOptions.findIndex(
    (option) => option.value === selectedOption?.value
  );

  const [optionFocusedIndex, setOptionFocusedIndex] = useState(
    indexSelectedValue !== -1 ? indexSelectedValue : 0
  );

  const optionRefs = useRef<Array<RefObject<HTMLLIElement>>>([]);
  const lastHandledTimestamp = useRef<number | null>(null);

  const { t } = useTranslation();
  const loadingMessage = t('status.loading');
  const noOptionsMessage = t('status.no_options');

  const handleArrowKeyPress = useCallback(
    (key: string) => {
      if (combinedOptions.length === 0) return;
      switch (key) {
        case KeyboardKey.ArrowUp:
          setOptionFocusedIndex((prevIndex) => {
            if (prevIndex === -1) {
              return combinedOptions.length - 1;
            } else {
              return (prevIndex - 1 + combinedOptions.length) % combinedOptions.length;
            }
          });
          break;
        case KeyboardKey.ArrowDown:
          setOptionFocusedIndex((prevIndex) => (prevIndex + 1) % combinedOptions.length);
          break;
      }
    },
    [combinedOptions]
  );

  const handleEnterKeyPress = useCallback(
    (key: string) => {
      if (combinedOptions.length === 0) return;
      if (!optionFocusedIndex && optionFocusedIndex !== 0) return;
      if (key !== KeyboardKey.Enter) return;
      if (optionFocusedIndex === -1) return;
      onOptionSelect(combinedOptions[optionFocusedIndex]);
    },
    [optionFocusedIndex, combinedOptions, onOptionSelect]
  );

  useEffect(() => {
    if (!(combinedOptions.length && typedText)) return;
    const searchArray = combinedOptions.map((option) => option.label);
    const searchMatchIndex = findMatchByIncreasingDepth(typedText, searchArray, typedMatchStrategy);
    if (searchMatchIndex !== -1) {
      setOptionFocusedIndex(searchMatchIndex);
    }
    const timer = setTimeout(() => setTypedText(''), 1000);
    return () => clearTimeout(timer);
  }, [typedText, combinedOptions, typedMatchStrategy]);

  const handleTypedText = useCallback(
    (key: string) => {
      setTypedText(typedText + key);
    },
    [typedText]
  );

  const handleKeyDown = useCallback(
    (key: string, event?: React.KeyboardEvent) => {
      switch (key) {
        case KeyboardKey.ArrowUp:
        case KeyboardKey.ArrowDown:
          event?.preventDefault();
          handleArrowKeyPress(key);
          break;
        case KeyboardKey.Enter:
          event?.preventDefault();
          handleEnterKeyPress(key);
          break;
        case KeyboardKey.Space:
          event?.preventDefault();
          handleTypedText(key);
          break;
        default:
          if (key.length === 1) {
            handleTypedText(key);
          }
      }
    },
    [handleArrowKeyPress, handleTypedText, handleEnterKeyPress]
  );

  useEffect(() => {
    if (keyEvent?.timeStamp === lastHandledTimestamp.current || !keyEvent) return;
    handleKeyDown(keyEvent.key);
    lastHandledTimestamp.current = keyEvent.timeStamp;
  }, [keyEvent, handleKeyDown]);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    optionRefs.current = combinedOptions.map((_, i) => optionRefs.current[i] || createRef());
    setIsInitialized(true);
  }, [combinedOptions]);

  useEffect(() => {
    if (!isInitialized || optionFocusedIndex < 0) return;

    const scrollToOption = () => {
      const targetRef = optionRefs.current[optionFocusedIndex]?.current;
      if (targetRef) {
        targetRef.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'start',
        });
      }
    };

    requestAnimationFrame(scrollToOption);
  }, [isInitialized, optionFocusedIndex]);

  const handlePointerUp = useCallback(
    (event: React.MouseEvent, option: OptionType) => {
      const dataIndex = event.currentTarget.getAttribute('data-index');
      if (!dataIndex) return;
      const index = parseInt(dataIndex, 10);
      setOptionFocusedIndex(index);
      onOptionSelect(option);
    },
    [onOptionSelect]
  );

  return (
    <div
      className={classNames(
        styles.selectList,
        isHeightUnlimited && styles['selectList--isHeightUnlimited'],
        styles[`selectList--backgroundColor-${componentTheme}`]
      )}
      {...rest}
    >
      {(options?.length === 0 || isLoading) && (
        <div className={styles.selectList__placeholder}>
          {isLoading && loadingMessage}
          {options?.length === 0 && !isLoading && noOptionsMessage}
        </div>
      )}
      {options && !isLoading && (
        <ul
          className={styles.selectList__ul}
          role={'listbox'}
          aria-label={ariaLabel}
          tabIndex={-1}
          onMouseDown={(event) => {
            // Prevent focus loss on scroll area click, maintaining keyboard navigation.
            event.preventDefault();
          }}
        >
          {combinedOptions.map((option, index) => {
            const isTopOption = index < (topOptions?.length ?? 0);
            const keyPrefix = isTopOption ? 'top-' : 'general-';
            const uniqueKey = `${keyPrefix}${option.value}`;
            const isBoundary = topOptions && index === topOptions.length - 1;
            const isOptionSelected = option.value === selectedOption?.value;
            return (
              <React.Fragment key={uniqueKey}>
                <SelectListItem
                  label={option.label}
                  value={option.value}
                  data-value={option.value}
                  icon={option.icon}
                  textOverflow={textOverflow}
                  role={'option'}
                  data-index={index}
                  ref={optionRefs.current[index]}
                  isFocused={index === optionFocusedIndex}
                  onClick={(event) => handlePointerUp(event, option)}
                  isSelected={isSelectedMarked ? isOptionSelected : false}
                  aria-selected={isOptionSelected}
                  backgroundPalette={
                    componentTheme === ComponentTheme.Grey
                      ? 'onGreyBackground'
                      : 'onLightBackground'
                  }
                />
                {isBoundary && <hr className={styles.selectList__divider} key="divider" />}
              </React.Fragment>
            );
          })}
        </ul>
      )}
      {children && <div className={styles.selectList__childrenContainer}>{children}</div>}
    </div>
  );
};

export default SelectList;
