import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';
import IconArrow from '../../../assets/icons/arrowCheck.svg?react';
import IconClose from '../../../assets/icons/close.svg?react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = !inputValue && !selectedValue ? placeholder : '';
  const toggleSelectTooltip = isExpanded ? 'TRANSLATE Collapse' : 'TRANSLATE Expand';

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleFocusIn = () => {
      setIsFocused(true);
      console.log('handleFocusIn');
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (wrapper && !wrapper.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
        setIsExpanded(false);
        setInputValue('');
        console.log('handleFocusOut');
      }
    };

    wrapper?.addEventListener('focusin', handleFocusIn);
    wrapper?.addEventListener('focusout', handleFocusOut);

    return () => {
      wrapper?.removeEventListener('focusin', handleFocusIn);
      wrapper?.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const handleControlClick = () => {
    setIsFocused(true);
    console.log('handleControlClick');
    if (!inputValue) {
      setIsExpanded(!isExpanded);
      console.log('handleControlClick if (!inputValue)');
    }
    inputRef.current?.focus();
  };

  const handleClearButtonClick = () => {
    setInputValue('');
    setSelectedValue('');
    console.log('handleClearButtonClick');
  };

  const handleExpandedButton = () => {
    setIsExpanded(!isExpanded);
    console.log('handleExpandedButton');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsExpanded(true);
    console.log('handleInputChange');
  };

  return (
    <div className={styles.select} ref={wrapperRef}>
      <div className={styles.select__controlContainer}>
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
              <div className={styles.select__inputContainer}>
                <InputBase
                  autoFocus={isFocused}
                  paddingLeft="none"
                  paddingRight="none"
                  onChange={handleInputChange}
                  value={inputValue}
                  ref={inputRef}
                  readOnly={!isSearchable}
                  placeholder={currentPlaceholder}
                />
              </div>
            </div>
            <div className={styles.select__suffixContainer}>
              {isClearable && (
                <div className={styles.select__buttonContainer}>
                  {(inputValue || selectedValue) && (
                    <div className={styles.select__buttonWrap}>
                      <IconButton tooltipMessage="TRANSLATE Clear" onClick={handleClearButtonClick}>
                        <IconClose className={styles.select__IconClose} />
                      </IconButton>
                    </div>
                  )}
                </div>
              )}
              <div className={styles.select__divider}></div>
              <div className={styles.select__buttonContainer}>
                <div className={styles.select__buttonWrap}>
                  <IconButton tooltipMessage={toggleSelectTooltip} onClick={handleExpandedButton}>
                    <IconArrow className={styles.select__IconArrow} />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </FieldWrapper>
      </div>
      {isExpanded && (
        <div className={classNames(styles.select__options, styles.options)}>
          <div className={styles.options__placeholder}>No options</div>
        </div>
      )}
    </div>
  );
}

export default Select;
