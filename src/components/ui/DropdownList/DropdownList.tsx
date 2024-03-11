import {
  useEffect,
  useRef,
  useState,
  createRef,
  RefObject,
  useMemo,
  useCallback,
  Fragment,
} from 'react';
import classNames from 'classnames';
import { firstMatchFinder, SearchStrategy } from 'utils/searchUtils';
import { Key } from 'utils/keyboard';
import styles from './DropdownList.module.scss';
import { DropdownListProps, DropdownOptionProps } from './types';
import DropdownOption from './DropdownOption';

function DropdownList(props: DropdownListProps) {
  const {
    children,
    isLoading = false,
    options,
    topOptions,
    textOverflow = 'wrap',
    isHeightUnlimited = false,
    isMenu,
    keyEvent,
    initialSelected,
    isSelectedMarked = true,
    typedSearchStrategy = SearchStrategy.StartWord,
    ariaLabel,
    backgroundColor = 'grey',
    onOptionSelect,
  } = props;

  const [typedText, setTypedText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [optionFocusedIndex, setOptionFocusedIndex] = useState(initialSelected ?? 0);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const [selectedOption, setSelectedOption] = useState<DropdownOptionProps | undefined>();

  const optionRefs = useRef<Array<RefObject<HTMLLIElement>>>([]);

  const combinedOptions = useMemo(() => {
    return [...(topOptions ?? []), ...(options ?? [])];
  }, [options, topOptions]);

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  const handleNavigationKeyPress = useCallback(
    (key: string) => {
      if (key === Key.ArrowUp) {
        setOptionFocusedIndex(
          (prevIndex) => (prevIndex - 1 + combinedOptions.length) % combinedOptions.length
        );
      } else if (key === Key.ArrowDown) {
        setOptionFocusedIndex((prevIndex) => (prevIndex + 1) % combinedOptions.length);
      } else if (key === Key.Enter) {
        setSelectedIndex(optionFocusedIndex);
        setSelectedOption(combinedOptions[optionFocusedIndex]);
      }
    },
    [combinedOptions, optionFocusedIndex]
  );

  useEffect(() => {
    if (combinedOptions.length && typedText) {
      const searchArray = combinedOptions.map((option) => option.label);
      const searchMatchIndex = firstMatchFinder(typedText, searchArray, typedSearchStrategy);
      if (searchMatchIndex !== -1) {
        setOptionFocusedIndex(searchMatchIndex);
      }
    }
    const timer = setTimeout(() => setTypedText(''), 1000);
    return () => clearTimeout(timer);
  }, [typedText, combinedOptions, typedSearchStrategy]);

  useEffect(() => {
    optionRefs.current = combinedOptions.map((_, i) => optionRefs.current[i] || createRef());
  }, [combinedOptions]);

  useEffect(() => {
    if (keyEvent && !isFocused) {
      handleNavigationKeyPress(keyEvent.key);
    }
  }, [keyEvent, isFocused, handleNavigationKeyPress]);

  useEffect(() => {
    if (optionFocusedIndex >= 0 && optionRefs.current[optionFocusedIndex]) {
      optionRefs.current[optionFocusedIndex].current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [optionFocusedIndex]);

  useEffect(() => {
    if (onOptionSelect && selectedOption) {
      onOptionSelect(selectedOption);
    }
  }, [selectedOption, onOptionSelect]);

  const handleTypedText = (key: string) => {
    setTypedText(typedText + key);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key === Key.ArrowUp || key === Key.ArrowDown || key === Key.Enter) {
      event.preventDefault();
      handleNavigationKeyPress(key);
    } else if (key === Key.Space) {
      event.preventDefault();
      handleTypedText(key);
    } else if (key.length === 1) {
      handleTypedText(key);
    }
  };

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const dataIndex = event.currentTarget.getAttribute('data-index');
      if (dataIndex !== null) {
        const index = parseInt(dataIndex, 10);
        setOptionFocusedIndex(index);
        setSelectedIndex(index);
        setSelectedOption(combinedOptions[index]);
      }
    },
    [combinedOptions]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={classNames(
        styles.dropdownList,
        isHeightUnlimited && styles['dropdownList--isHeightUnlimited']
      )}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {(!options || isLoading) && (
        <div className={styles.dropdownList__placeholder}>
          {isLoading && loadingMessage}
          {!options && !isLoading && noOptionsMessage}
        </div>
      )}
      {options && (
        <ul
          className={styles.dropdownList__list}
          role={isMenu ? 'menu' : 'listbox'}
          aria-label={ariaLabel}
          onMouseDown={(event) => {
            /*
             * Prevents focus loss when clicking on the scroll area with the mouse.
             * This ensures that focus remains within the dropdown during scrolling interactions,
             * allowing users to continue using keyboard navigation (up/down arrows)
             * to move between options regardless of where the focus is.
             */
            event.preventDefault();
          }}
        >
          {combinedOptions.map((option, index) => {
            const isTopOption = index < (topOptions?.length ?? 0);
            const keyPrefix = isTopOption ? 'top-' : 'general-';
            const uniqueKey = `${keyPrefix}${option.value}`;
            const isBoundary = topOptions && index === topOptions.length - 1;
            return (
              <Fragment key={uniqueKey}>
                <DropdownOption
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
                    backgroundColor === 'grey' ? 'onGrayBackground' : 'onLightBackground'
                  }
                />
                {isBoundary && <li className={styles.dropdownList__divider} key="divider"></li>}
              </Fragment>
            );
          })}
        </ul>
      )}
      {children && <div className={styles.dropdownList__childrenContainer}>{children}</div>}
    </div>
  );
}

export default DropdownList;
