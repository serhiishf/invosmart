import classNames from 'classnames';
import styles from './DropdownList.module.scss';
import { DropdownListProps } from './types';
import DropdownItem from './DropdownItem';

function DropdownList(props: DropdownListProps) {
  const { children, isLoading = false, options, topOptions } = props;

  return (
    <div className={classNames(styles.dropdownList)}>
      {options && <div className={styles.dropdownList__placeholder}>No options</div>}
      {options && (
        <div className={styles.dropdownList__lists} role="listbox">
          {topOptions && (
            <ul className={styles.dropdownList__topList}>
              <>
                {topOptions.map((option) => {
                  return (
                    <DropdownItem key={option.value} label={option.label} value={option.value} />
                  );
                })}
              </>
            </ul>
          )}
          {options && (
            <ul className={styles.dropdownList__topList}>
              <>
                {options.map((option) => {
                  return (
                    <DropdownItem key={option.value} label={option.label} value={option.value} />
                  );
                })}
              </>
            </ul>
          )}
        </div>
      )}
      {children && <div className={styles.dropdownList__childrenContainer}>{children}</div>}
    </div>
  );
}

export default DropdownList;
