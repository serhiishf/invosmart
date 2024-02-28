import classNames from 'classnames';
import styles from './DropdownList.module.scss';
import { DropdownListProps } from './types';
import DropdownItem from './DropdownItem';
import IconSetting from '../../../assets/icons/settings.svg?react';

function DropdownList(props: DropdownListProps) {
  const {
    children,
    isLoading = false,
    options,
    topOptions,
    textOverflow = 'wrap',
    isHeightUnlimited = false,
  } = props;

  const loadingMessage = 'TRANSLATE Is loading...';
  const noOptionsMessage = 'TRANSLATE No options';

  return (
    <div
      className={classNames(
        styles.dropdownList,
        isHeightUnlimited && styles['dropdownList--isHeightUnlimited']
      )}
    >
      {(!options || isLoading) && (
        <div className={styles.dropdownList__placeholder}>
          {isLoading && loadingMessage}
          {!options && !isLoading && noOptionsMessage}
        </div>
      )}
      {options && (
        <div className={styles.dropdownList__lists} role="listbox">
          {topOptions && (
            <ul className={styles.dropdownList__topList}>
              {topOptions.map((option) => {
                return (
                  <DropdownItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    data-value={option.value}
                    textOverflow={textOverflow}
                  />
                );
              })}
            </ul>
          )}
          {options && (
            <ul className={styles.dropdownList__topList}>
              {options.map((option) => {
                return (
                  <DropdownItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    icon={<IconSetting />}
                    data-value={option.value}
                    textOverflow={textOverflow}
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
