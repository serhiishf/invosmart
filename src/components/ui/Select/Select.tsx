import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { OptionType } from 'types/common';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { KeyboardKey } from 'constants/keyboard';
import { FieldWrapper, InputBase, IconButton, Dropdown } from '..';
import IconDirectionArrow from 'assets/icons/directionCheck.svg?react';
import IconClose from 'assets/icons/close.svg?react';
import { MatchStrategy, filterOptions } from 'utils/searchUtils';

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
  }: SelectProps = props;

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTopOptions, setCurrentTopOptions] = useState(topOptions);
  const [currentOptions, setCurrentOptions] = useState(options);
  const [keyEvent, setKeyEvent] = useState({ key: '', timeStamp: 0 });

  const selectRef = useRef<HTMLDivElement>(null);
  const suffixContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = !inputValue && !selectedOption?.value ? placeholder : '';
  const toggleSelectTooltip = isExpanded ? 'TRANSLATE Collapse' : 'TRANSLATE Expand';

  const handleSelectFocus = (event: React.FocusEvent<Element>) => {
    // Ignore initial focus event to prevent duplicate handling.
    if (isFocused) return;
    // Ignore event if it originates from suffix container (has its own handling).
    if (suffixContainerRef.current?.contains(event.target)) {
      return;
    }
    setIsFocused(true);
  };

  const handleSelectPointerDown = (event: React.PointerEvent<Element>) => {
    if (event.target instanceof Element && suffixContainerRef.current?.contains(event.target)) {
      return;
    } else {
      if (!isExpanded) setIsExpanded(!isExpanded);
    }
    if (isSearchable) return;
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
    setCurrentOptions(options);
    setCurrentTopOptions(topOptions);
    setInputValue(selectedOption?.label ?? '');
  };

  const handleClearButtonClick = () => {
    setSelectedOption(undefined);
    setInputValue('');
    setCurrentOptions(options);
    setCurrentTopOptions(topOptions);
    inputRef.current?.focus();
  };

  const handleExpandedButton = () => {
    setIsFocused(true);
    setIsExpanded((prevState) => {
      return !prevState;
    });
    setInputValue(selectedOption?.label ?? '');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);
    setIsExpanded(true);
    console.log(currentInputValue, selectedOption?.label);
    if (/* currentInputValue !== selectedOption?.label && */ options) {
      const filteredOptions = filterOptions(currentInputValue, options, MatchStrategy.AnyMatch);
      console.log('filter options');
      if (topOptions) {
        const filteredTopOptions = filterOptions(
          currentInputValue,
          topOptions,
          MatchStrategy.AnyMatch
        );
        setCurrentTopOptions(filteredTopOptions);
      }

      setCurrentOptions(filteredOptions);
    }
    if (currentInputValue === '') {
      setSelectedOption(undefined);
      setCurrentOptions(options);
      setCurrentTopOptions(topOptions);
    }
  };

  const clearKeyEvent = () => {
    setKeyEvent({ key: '', timeStamp: 0 });
  };

  const handleOptionSelect = (selectedOption: OptionType) => {
    setSelectedOption(selectedOption);
    setInputValue(selectedOption.label);
    setIsExpanded(false);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;
      if (isExpanded && isInputFocused) {
        if (
          key === KeyboardKey.ArrowUp ||
          key === KeyboardKey.ArrowDown ||
          key === KeyboardKey.Enter
        ) {
          event.preventDefault();
          setKeyEvent({ key: key, timeStamp: event.timeStamp });
          setTimeout(clearKeyEvent, 0);
        }
        if (!isSearchable && (key.length === 1 || key === KeyboardKey.Space)) {
          setKeyEvent({ key: key, timeStamp: event.timeStamp });
        }
      } else if (!isExpanded) {
        if (key === KeyboardKey.ArrowUp || key === KeyboardKey.ArrowDown) {
          setIsExpanded(true);
        } else if (key === KeyboardKey.Enter && isInputFocused) {
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
                  paddingRight={'none'}
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
                  aria-autocomplete="list"
                  aria-readonly={!isSearchable}
                />
              </div>
            </div>
            <div className={styles.select__suffixContainer} ref={suffixContainerRef}>
              {isClearable && isExpanded && (
                <div className={styles.select__buttonContainer}>
                  {(inputValue || selectedOption?.value) && (
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
          <Dropdown
            options={currentOptions}
            topOptions={currentTopOptions}
            keyEvent={keyEvent}
            onOptionSelect={handleOptionSelect}
            selectedValue={selectedOption?.value}
          >
            {children}
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Select;
