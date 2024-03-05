import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton, DropdownList } from '..';
import IconDirectionArrow from '../../../assets/icons/directionCheck.svg?react';
import IconClose from '../../../assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const {
    isSearchable = true,
    isClearable = true,
    hasExpandCollapseButton = true,
    placeholder = 'Select city',
    label = 'Default label',
    options,
    topOptions,
    children,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainOptions, setMainOptions] = useState(options);
  const [keyEvent, setKeyEvent] = useState({ key: '', timeStamp: 0 });

  const selectRef = useRef<HTMLDivElement>(null);
  const suffixContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = !inputValue && !selectedValue ? placeholder : '';
  const toggleSelectTooltip = isExpanded ? 'TRANSLATE Collapse' : 'TRANSLATE Expand';

  const handleSelectFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (suffixContainerRef.current && suffixContainerRef.current.contains(event.target)) {
      console.log('Focus on expanded button - ignoring select focus logic');
      return;
    }
    if (!isFocused) {
      setIsFocused(true);
      setIsExpanded(true);
      console.log('handleSelectFocus');
    }
  };

  const handleSelectPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log(event.target);
    if (!isSearchable) {
      if (
        event.target instanceof Element &&
        suffixContainerRef.current &&
        suffixContainerRef.current.contains(event.target)
      ) {
        console.log('return handleSelectPointerDown');
        return;
      }
      setIsExpanded(!isExpanded);
      console.log('handleSelectPointerDown');
    }
  };

  const handleSelectBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    console.log(document.activeElement);
    if (selectRef.current && !selectRef.current.contains(event.relatedTarget)) {
      if (event.target !== document.activeElement) {
        setIsFocused(false);
        setIsExpanded(false);
        setInputValue('');
        console.log('Focus truly lost');
      }
    } else {
      console.log('Focus not luse');
    }
  };

  const handleClearButtonClick = () => {
    setInputValue('');
    setSelectedValue('');
    console.log('handleClearButtonClick');
    inputRef.current?.focus();
  };

  const handleExpandedButton = () => {
    if (!isFocused) {
      setIsFocused(true);
    }
    if (isExpanded) {
      setIsExpanded(false);
      setInputValue('');
    } else {
      setIsExpanded(true);
    }
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsExpanded(true);
    console.log(`handleInputChange ${isExpanded}`);
  };

  const clearKeyEvent = () => {
    setKeyEvent({ key: '', timeStamp: 0 });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event && isExpanded) {
        console.log(event);
        console.log('event work');
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter')
          event.preventDefault();
        setKeyEvent({ key: event.key, timeStamp: event.timeStamp });
        setTimeout(clearKeyEvent, 0);
      }
    },
    [isExpanded]
  );

  return (
    <div
      className={styles.select}
      ref={selectRef}
      tabIndex={-1}
      onFocus={handleSelectFocus}
      onBlur={handleSelectBlur}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.select__controlContainer}>
        <FieldWrapper isFocused={isFocused} isHoverable={!isFocused} label={label}>
          <div
            className={classNames(
              styles.select__control,
              isFocused && styles['select__control--isFocused']
            )}
            onPointerDown={handleSelectPointerDown}
          >
            <div className={styles.select__valueContainer}>
              <div className={styles.select__valueItem}></div>
              <div className={styles.select__inputContainer}>
                <InputBase
                  autoFocus={isFocused}
                  paddingRight="none"
                  onChange={handleInputChange}
                  value={inputValue}
                  ref={inputRef}
                  readOnly={!isSearchable}
                  placeholder={currentPlaceholder}
                  role="combobox"
                  aria-expanded={isExpanded}
                />
              </div>
            </div>
            <div className={styles.select__suffixContainer} ref={suffixContainerRef}>
              {isClearable && (
                <div className={styles.select__buttonContainer}>
                  {(inputValue || selectedValue) && (
                    <div className={styles.select__buttonWrap}>
                      <IconButton tooltip="TRANSLATE Clear" onClick={handleClearButtonClick}>
                        <IconClose className={styles.select__iconClose} />
                      </IconButton>
                    </div>
                  )}
                </div>
              )}
              {hasExpandCollapseButton && (
                <>
                  <div className={styles.select__divider}></div>
                  <div className={styles.select__buttonContainer}>
                    <div className={styles.select__buttonWrap}>
                      <IconButton tooltip={toggleSelectTooltip} onClick={handleExpandedButton}>
                        <IconDirectionArrow
                          className={classNames(
                            styles.select__iconDirectionArrow,
                            isExpanded && styles['select__iconDirectionArrow--isExpanded']
                          )}
                        />
                      </IconButton>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </FieldWrapper>
      </div>
      {isExpanded && (
        <div className={classNames(styles.select__options)}>
          <DropdownList options={mainOptions} topOptions={topOptions} keyEvent={keyEvent}>
            {children}
          </DropdownList>
        </div>
      )}
    </div>
  );
}

export default Select;
