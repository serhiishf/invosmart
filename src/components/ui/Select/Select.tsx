import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { KeyboardKey } from 'utils/keyboard';
import { FieldWrapper, InputBase, IconButton, Dropdown } from '..';
import IconDirectionArrow from 'assets/icons/directionCheck.svg?react';
import IconClose from 'assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const {
    isSearchable = false,
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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainOptions, setMainOptions] = useState(options);
  const [keyEvent, setKeyEvent] = useState({ key: '', timeStamp: 0 });

  const selectRef = useRef<HTMLDivElement>(null);
  const suffixContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = !inputValue && !selectedValue ? placeholder : '';
  const toggleSelectTooltip = isExpanded ? 'TRANSLATE Collapse' : 'TRANSLATE Expand';

  const handleSelectFocus = (event: React.FocusEvent<Element>) => {
    // Ignore initial focus event to prevent duplicate handling.
    if (isFocused) return;
    // Ignore event if it originates from suffix container (has its own handling).
    if (suffixContainerRef.current?.contains(event.target)) {
      return;
    }
    setIsFocused(true);
    setIsExpanded(true);
  };

  const handleSelectPointerDown = (event: React.PointerEvent<Element>) => {
    // Ignoring these events because they have their own handlers.
    if (isSearchable) return;
    if (event.target instanceof Element && suffixContainerRef.current?.contains(event.target)) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleSelectBlur = (event: React.FocusEvent<Element>) => {
    if (
      selectRef.current?.contains(event.relatedTarget) ||
      event.target === document.activeElement
    ) {
      return;
    }
    setIsFocused(false);
    setIsExpanded(false);
    setInputValue('');
  };

  const handleClearButtonClick = () => {
    setInputValue('');
    setSelectedValue('');
    inputRef.current?.focus();
  };

  const handleExpandedButton = () => {
    setIsFocused(true);
    setIsExpanded((prevState) => {
      if (prevState) setInputValue('');
      return !prevState;
    });
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsExpanded(true);
  };

  const clearKeyEvent = () => {
    setKeyEvent({ key: '', timeStamp: 0 });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;
      console.log('reset in select keyborad event');
      if (isExpanded && isInputFocused) {
        if (
          event.key === KeyboardKey.ArrowUp ||
          event.key === KeyboardKey.ArrowDown ||
          event.key === KeyboardKey.Enter
        ) {
          event.preventDefault();
          setKeyEvent({ key: event.key, timeStamp: event.timeStamp });
          setTimeout(clearKeyEvent, 0);
        }
        if (!isSearchable && (key.length === 1 || key === KeyboardKey.Space)) {
          setKeyEvent({ key: event.key, timeStamp: event.timeStamp });
        }
      } else if (!isExpanded) {
        if (event.key === KeyboardKey.ArrowUp || event.key === KeyboardKey.ArrowDown) {
          setIsExpanded(true);
        }
      }
      if (key === KeyboardKey.Escape) {
        setIsExpanded(false);
      }
    },
    [isExpanded, isInputFocused, isSearchable]
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
                  isReadOnlyMode={!isSearchable}
                  placeholder={currentPlaceholder}
                  inputMode="none"
                  role="combobox"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  aria-expanded={isExpanded}
                  aria-haspopup="true"
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
          <Dropdown options={mainOptions} topOptions={topOptions} keyEvent={keyEvent}>
            {children}
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Select;
