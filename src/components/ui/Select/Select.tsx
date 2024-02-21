import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';
import ArrowIcon from '../../../assets/icons/arrowCheck.svg?react';
import CloseIcon from '../../../assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const {
    isSearchable = true,
    isClearable = true,
    placeholder = 'Select city',
    label = 'Default label',
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    console.log(wrapperRef, 'WRAPPER');
    const handleFocusIn = (event: FocusEvent) => {
      setIsFocused(true);
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (wrapper && !wrapper.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
      }
    };

    wrapper?.addEventListener('focusin', handleFocusIn);
    wrapper?.addEventListener('focusout', handleFocusOut);

    return () => {
      wrapper?.removeEventListener('focusin', handleFocusIn);
      wrapper?.removeEventListener('focusout', handleFocusOut);
    };
  }, [wrapperRef]);

  const handleControlClick = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleClearButtonClick = () => {
    setInputValue('');
    setSelectedValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.select} ref={wrapperRef}>
      <FieldWrapper isFocused={isFocused} isHoverable={!isFocused} label={label}>
        <div
          className={classNames(
            styles.select__control,
            isFocused && styles['select__control--isFocused']
          )}
          onClick={handleControlClick}
        >
          <div className={styles.select__valueContainer}>
            <div className={styles.select__valueItem}></div>
            {!inputValue && placeholder && (
              <div className={styles.select__placeholder}>{placeholder}</div>
            )}
            <div className={styles.select__inputContainer}>
              <InputBase
                autoFocus={isFocused}
                paddingLeft="none"
                paddingRight="none"
                onChange={handleInputChange}
                value={inputValue}
                ref={inputRef}
                readOnly={!isSearchable}
              />
            </div>
          </div>
          <div className={styles.select__suffixContainer}>
            {isClearable && (
              <div className={styles.select__buttonContainer}>
                {(inputValue || selectedValue) && (
                  <div className={styles.select__clearButtonWrap}>
                    <IconButton tooltipMessage="TRANSLATE Clear" onClick={handleClearButtonClick}>
                      <CloseIcon className={styles.select__closeIcon} />
                    </IconButton>
                  </div>
                )}
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
