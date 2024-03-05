import { useEffect, useRef, useState, createRef, RefObject, useCallback } from 'react';
import classNames from 'classnames';
import firstMatchFinder from '../../../utils/searchUtils';
import styles from './DropdownList.module.scss';
import { DropdownListProps } from './types';
import DropdownOption from './DropdownOption';

function DropdownList(props: DropdownListProps) {
  const {
    children,
    isLoading = false,
    options,
    topOptions,
    textOverflow = 'wrap',
    isHeightUnlimited = false,
    isMenu = true,
    keyEvent,
    initialSelected,
    isSelectedHighlighted = true,
  } = props;

  const INDEX_NOT_SET = -1;

  const [typedText, setTypedText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [optionFocusedIndex, setOptionFocusedIndex] = useState(INDEX_NOT_SET);
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);
  const optionRefs = useRef<Array<RefObject<HTMLLIElement>>>([]);

  const combinedOptions = [...(topOptions ?? []), ...(options ?? [])];

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  const handleNavigationKeyPress = (key: string) => {
    if (key === 'ArrowUp') {
      switch (true) {
        case optionFocusedIndex > 0:
          setOptionFocusedIndex(optionFocusedIndex - 1);
          break;
        case optionFocusedIndex === 0:
          setOptionFocusedIndex(combinedOptions.length - 1);
          break;
      }
    } else if (key === 'ArrowDown') {
      switch (true) {
        case optionFocusedIndex < combinedOptions.length - 1:
          setOptionFocusedIndex(optionFocusedIndex + 1);
          break;
        case optionFocusedIndex === combinedOptions.length - 1:
          setOptionFocusedIndex(0);
          break;
      }
    } else if (key === 'Enter') {
      setSelectedIndex(optionFocusedIndex);
    }
  };

  useEffect(() => {
    if (combinedOptions.length && typedText) {
      const searchArray = combinedOptions.map((option) => option.label);
      setOptionFocusedIndex(firstMatchFinder(typedText, searchArray, 'startString'));
    }
    const timer = setTimeout(() => setTypedText(''), 1000);
    console.log(`typedText: ${typedText}`);
    return () => clearTimeout(timer);
  }, [typedText]);

  useEffect(() => {
    optionRefs.current = combinedOptions.map((_, i) => optionRefs.current[i] || createRef());
  }, [combinedOptions]);

  useEffect(() => {
    if (keyEvent && !isFocused) {
      // console.log(`Key pressed: ${keyEvent.key}`);
      handleNavigationKeyPress(keyEvent.key);
    }
  }, [keyEvent]);

  useEffect(() => {
    if (optionFocusedIndex >= 0 && optionRefs.current[optionFocusedIndex]) {
      optionRefs.current[optionFocusedIndex].current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [optionFocusedIndex]);

  const handleTypedText = (event: React.KeyboardEvent) => {
    setTypedText(typedText + event.key);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key;
    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
      event.preventDefault();
      handleNavigationKeyPress(key);
    } else if (event.key.length === 1) {
      handleTypedText(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const dataIndex = event.currentTarget.getAttribute('data-index');
    const index = dataIndex ? parseInt(dataIndex, 10) : null;
    if (index !== null) {
      setOptionFocusedIndex(index);
    }
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    const dataIndex = event.currentTarget.getAttribute('data-index');
    const index = dataIndex ? parseInt(dataIndex, 10) : null;
    console.log('click enter', index);
    if (index !== null) {
      setOptionFocusedIndex(index);
      setSelectedIndex(index);
    }
  };

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
      onMouseDown={handleMouseDown}
    >
      {(!options || isLoading) && (
        <div className={styles.dropdownList__placeholder}>
          {isLoading && loadingMessage}
          {!options && !isLoading && noOptionsMessage}
        </div>
      )}
      {options && (
        <div className={styles.dropdownList__lists}>
          <ul className={styles.dropdownList__topList} role={isMenu ? 'menu' : 'listbox'}>
            {combinedOptions.map((option, index) => {
              const isBoundary = topOptions && topOptions?.length - 1 === index;
              return (
                <>
                  <DropdownOption
                    tabIndex={index === optionFocusedIndex ? 0 : -1}
                    //TODO: UNIQUE KEY
                    key={option.value}
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
                    isSelected={isSelectedHighlighted ? index === selectedIndex : false}
                  />
                  {isBoundary && <li className={styles.dropdownList__divider}></li>}
                </>
              );
            })}
          </ul>
        </div>
      )}
      {children && <div className={styles.dropdownList__childrenContainer}>{children}</div>}
    </div>
  );
}

export default DropdownList;
