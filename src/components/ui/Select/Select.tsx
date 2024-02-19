import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';

function Select(props: SelectProps) {
  const { isSearchable = false } = props;
  return (
    <div className={styles.select}>
      <FieldWrapper>
        <div className={styles.select__control}>
          <div className={styles.select__valueContainer}>
            <div className={styles.select__valueItem}></div>
            <div className={styles.select__inputContainer}>
              {isSearchable && <InputBase paddingLeft="compact" paddingRight="compact" />}
            </div>
          </div>
          <div className={styles.select__suffixContainer}>
            <IconButton className={styles.select__clearBtn}></IconButton>
            <div className={styles.select__divider}></div>
          </div>
        </div>
      </FieldWrapper>
    </div>
  );
}

export default Select;
