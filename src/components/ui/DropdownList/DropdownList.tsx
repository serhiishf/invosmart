import { useEffect, useRef, useState, createRef, RefObject } from 'react';
import classNames from 'classnames';
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
    isMenu = false,
    keyEvent,
  } = props;

  const [typedText, setTypedText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionRefs = useRef<Array<RefObject<HTMLLIElement>>>([]);

  const combinedOptions = [...(topOptions ?? []), ...(options ?? [])];

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  const handleNavigationKeyPress = (key: string) => {
    if (key === 'ArrowUp') {
      switch (true) {
        case highlightedIndex > 0:
          setHighlightedIndex(highlightedIndex - 1);
          break;
        case highlightedIndex === 0:
          setHighlightedIndex(combinedOptions.length - 1);
          break;
      }
    } else if (key === 'ArrowDown') {
      switch (true) {
        case highlightedIndex < combinedOptions.length - 1:
          setHighlightedIndex(highlightedIndex + 1);
          break;
        case highlightedIndex === combinedOptions.length - 1:
          setHighlightedIndex(0);
          break;
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setTypedText(''), 1000);
    return () => clearTimeout(timer);
  }, [typedText]);

  useEffect(() => {
    optionRefs.current = combinedOptions.map((_, i) => optionRefs.current[i] || createRef());
  }, [combinedOptions]);

  useEffect(() => {
    if (keyEvent) {
      console.log(`Key pressed: ${keyEvent.key}`);
      handleNavigationKeyPress(keyEvent.key);
    }
  }, [keyEvent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event);
    const key = event.key;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();
      handleNavigationKeyPress(key);
    }
  };

  const handleOptionAction = (event: React.SyntheticEvent<HTMLLIElement>) => {
    const dataIndex = event.currentTarget.getAttribute('data-index');
    const index = dataIndex ? parseInt(dataIndex, 10) : null;
    if (index !== null) {
      setHighlightedIndex(index);
    }
    console.log('DELETE DropdownOption click or Enter');
  };

  return (
    <div
      className={classNames(
        styles.dropdownList,
        isHeightUnlimited && styles['dropdownList--isHeightUnlimited']
      )}
      onKeyDown={handleKeyDown}
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
                    tabIndex={index === highlightedIndex ? 0 : -1}
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
                    isHighlighted={index === highlightedIndex}
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
