import { useState } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';
import ArrowIcon from '../../../assets/icons/arrowCheck.svg?react';
import CloseIcon from '../../../assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const { isSearchable = true, placeholder = 'Select city' } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.select}>
      <FieldWrapper>
        <div
          className={classNames(
            styles.select__control,
            isOpen && styles['select__control--isOpen']
          )}
        >
          <div className={styles.select__valueContainer}>
            <div className={styles.select__valueItem}></div>
            <div className={styles.select__inputContainer}>
              {isSearchable && <InputBase paddingLeft="compact" paddingRight="compact" />}
            </div>
          </div>
          <div className={styles.select__suffixContainer}>
            {isSearchable && (
              <div className={styles.select__buttonContainer}>
                <div className={styles.select__buttonWrap}>
                  <IconButton tooltipMessage="TRANSLATE Clear">
                    <CloseIcon className={styles.select__closeIcon} />
                  </IconButton>
                </div>
              </div>
            )}
            <div className={styles.select__divider}></div>
            <div className={styles.select__iconContainer}>
              <ArrowIcon className={styles.select__arrowIcon} />
            </div>
          </div>
        </div>
      </FieldWrapper>
    </div>
  );
}

export default Select;
