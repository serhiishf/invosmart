import styles from './DropdownItem.module.scss';
import { DropdownItemProps } from './types';

function DropdownItem(props: DropdownItemProps) {
  const { label, value, icon, isDisabled = false } = props;
  return (
    <li className={styles.dropdownItem} role="option" data-value={value}>
      {icon && <div> logo</div>}
      <span>{label}</span>
    </li>
  );
}

export default DropdownItem;
