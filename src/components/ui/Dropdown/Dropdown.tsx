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
import { firstMatchFinder, SearchStrategy } from 'utils/searchUtils';
import { ComponentTheme, TextOverflow } from 'constants/theme';
import { KeyboardKey } from 'utils/keyboard';
import { DropdownProps, OptionProps, OptionTheme } from './types';
import styles from './Dropdown.module.scss';
import Option from './Option';

const Dropdown = (props: DropdownProps) => {
  const {
    children,
    isLoading = false,
    options,
    topOptions,
    textOverflow = TextOverflow.Wrap,
    isHeightUnlimited = false,
    isMenu = true,
    keyEvent,
    initialSelected,
    isSelectedMarked = true,
    typedSearchStrategy = SearchStrategy.StartWord,
    ariaLabel,
    componentTheme = ComponentTheme.Grey,
    onOptionSelect,
  } = props;

  const [typedText, setTypedText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [optionFocusedIndex, setOptionFocusedIndex] = useState(initialSelected || isMenu ? -1 : 0);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const [selectedOption, setSelectedOption] = useState<OptionProps | undefined>();

  const optionRefs = useRef<Array<RefObject<HTMLLIElement>>>([]);
  const lastHandledTimestamp = useRef<number | null>(null);

  const combinedOptions = useMemo(() => {
    return [...(topOptions ?? []), ...(options ?? [])];
  }, [options, topOptions]);

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  const handleArrowKeyPress = useCallback(
    (key: string) => {
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
      if (key !== KeyboardKey.Enter) return;
      setSelectedIndex(optionFocusedIndex);
      setSelectedOption(combinedOptions[optionFocusedIndex]);
    },
    [optionFocusedIndex, combinedOptions]
  );

  useEffect(() => {
    if (!(combinedOptions.length && typedText)) return;
    const searchArray = combinedOptions.map((option) => option.label);
    const searchMatchIndex = firstMatchFinder(typedText, searchArray, typedSearchStrategy);
    if (searchMatchIndex !== -1) {
      setOptionFocusedIndex(searchMatchIndex);
    }
    const timer = setTimeout(() => setTypedText(''), 1000);
    return () => clearTimeout(timer);
  }, [typedText, combinedOptions, typedSearchStrategy]);

  useEffect(() => {
    optionRefs.current = combinedOptions.map((_, i) => optionRefs.current[i] || createRef());
  }, [combinedOptions]);

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
    if (keyEvent?.timeStamp === lastHandledTimestamp.current || isFocused || !keyEvent) return;
    handleKeyDown(keyEvent.key);
    lastHandledTimestamp.current = keyEvent.timeStamp;
  }, [keyEvent, isFocused, handleKeyDown]);

  useEffect(() => {
    if (optionFocusedIndex < 0) return;
    optionRefs.current[optionFocusedIndex].current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  }, [optionFocusedIndex]);

  useEffect(() => {
    if (!onOptionSelect || !selectedOption) return;
    onOptionSelect(selectedOption);
  }, [selectedOption, onOptionSelect]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const dataIndex = event.currentTarget.getAttribute('data-index');
      if (!dataIndex) return;
      const index = parseInt(dataIndex, 10);
      setOptionFocusedIndex(index);
      setSelectedIndex(index);
      setSelectedOption(combinedOptions[index]);
    },
    [combinedOptions]
  );

  return (
    <div
      className={classNames(
        styles.dropdown,
        isHeightUnlimited && styles['dropdown--isHeightUnlimited'],
        styles[`dropdown--backgroundColor-${componentTheme}`]
      )}
      onKeyDown={(event) => handleKeyDown(event.key, event)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {(!options || isLoading) && (
        <div className={styles.dropdown__placeholder}>
          {isLoading && loadingMessage}
          {!options && !isLoading && noOptionsMessage}
        </div>
      )}
      {options && !isLoading && (
        <ul
          className={styles.dropdown__list}
          role={isMenu ? 'menu' : 'listbox'}
          aria-label={ariaLabel}
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
            return (
              <React.Fragment key={uniqueKey}>
                <Option
                  tabIndex={index === optionFocusedIndex ? 0 : -1}
                  label={option.label}
                  value={option.value}
                  data-value={option.value}
                  icon={option.icon}
                  textOverflow={textOverflow}
                  role={isMenu ? 'menuitem' : 'option'}
                  data-index={index}
                  ref={optionRefs.current[index]}
                  isFocused={index === optionFocusedIndex}
                  onPointerDown={handlePointerDown}
                  isSelected={isSelectedMarked ? index === selectedIndex : false}
                  aria-selected={index === selectedIndex}
                  backgroundPalette={
                    componentTheme === ComponentTheme.Grey
                      ? OptionTheme.OnGreyBackground
                      : OptionTheme.OnLightBackground
                  }
                />
                {isBoundary && <li className={styles.dropdown__divider} key="divider"></li>}
              </React.Fragment>
            );
          })}
        </ul>
      )}
      {children && <div className={styles.dropdown__childrenContainer}>{children}</div>}
    </div>
  );
};

export default Dropdown;
