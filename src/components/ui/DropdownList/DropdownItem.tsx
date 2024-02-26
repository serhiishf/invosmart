import classNames from 'classnames';
import styles from './DropdownItem.module.scss';
import { DropdownItemProps } from './types';

function DropdownItem(props: DropdownItemProps) {
  const { label, value, icon, isSelected, ...rest } = props;
  return (
    <li
      tabIndex={0}
      className={classNames(styles.dropdownItem, isSelected && styles['dropdownItem--isSelected'])}
      data-value={value}
      onClick={() => console.log('li click')}
      {...rest}
    >
      {icon && <div> logo</div>}
      <span>{label}</span>
    </li>
  );
}

export default DropdownItem;
