import { useEffect, useState } from 'react';
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
  } = props;

  const NO_SELECTION_INDEX = -1;

  const [typedText, setTypedText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(NO_SELECTION_INDEX);

  const combinedListLastIndex = (options?.length ?? 0) + (topOptions?.length ?? 0) - 1;

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  useEffect(() => {
    const timer = setTimeout(() => setTypedText(''), 1000);
    return () => clearTimeout(timer);
  }, [typedText]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleNavigationKeyPress(key);
      console.log(selectedIndex);
    }
    console.log(key);
  };

  const handleNavigationKeyPress = (key: string) => {
    if (key === 'ArrowUp') {
      switch (true) {
        case selectedIndex > 0:
          setSelectedIndex(selectedIndex - 1);
          break;
        case selectedIndex === NO_SELECTION_INDEX:
          setSelectedIndex(0);
          break;
      }
    } else if (key === 'ArrowDown' && selectedIndex < combinedListLastIndex) {
      setSelectedIndex(selectedIndex + 1);
    }
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
        <div className={styles.dropdownList__lists} role={isMenu ? 'menu' : 'listbox'}>
          {topOptions && (
            <>
              <ul className={styles.dropdownList__topList}>
                {topOptions.map((option) => {
                  return (
                    <DropdownOption
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      data-value={option.value}
                      icon={option.icon}
                      textOverflow={textOverflow}
                      role={isMenu ? 'menuitem' : 'option'}
                    />
                  );
                })}
              </ul>
              <div className={styles.dropdownList__divider}></div>
            </>
          )}
          {options && (
            <ul className={styles.dropdownList__topList}>
              {options.map((option) => {
                return (
                  <DropdownOption
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    data-value={option.value}
                    icon={option.icon}
                    textOverflow={textOverflow}
                    role={isMenu ? 'menuitem' : 'option'}
                  />
                );
              })}
            </ul>
          )}
        </div>
      )}
      {children && <div className={styles.dropdownList__childrenContainer}>{children}</div>}
    </div>
  );
}

export default DropdownList;
