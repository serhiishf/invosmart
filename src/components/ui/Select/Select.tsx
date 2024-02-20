import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';
import ArrowIcon from '../../../assets/icons/arrowCheck.svg?react';
import CloseIcon from '../../../assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const { isSearchable = true, isClearable, placeholder = 'Select city' } = props;

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.select}>
      <FieldWrapper isFocused={isFocused} isHoverable>
        <div
          className={classNames(
            styles.select__control,
            isFocused && styles['select__control--isFocused']
          )}
        >
          <div className={styles.select__valueContainer}>
            <div className={styles.select__valueItem}></div>
            <div className={styles.select__inputContainer}>
              {isSearchable && <InputBase paddingLeft="compact" paddingRight="compact" />}
            </div>
          </div>
          <div className={styles.select__suffixContainer}>
            {isClearable && (
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
