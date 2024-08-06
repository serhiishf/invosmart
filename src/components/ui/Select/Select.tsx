import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { OptionType } from 'types/common';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { KeyboardKey } from 'constants/keyboard';
import { FieldWrapper, InputBase, IconButton, SelectList, Spinner } from '..';
import IconDirectionArrow from 'assets/icons/directionCheck.svg?react';
import IconClose from 'assets/icons/close.svg?react';
import { MatchStrategy, filterOptions } from 'utils/searchUtils';

const Select = ({
  isSearchable = true,
  isClearable = true,
  hasExpandCollapseButton = true,
  placeholder,
  label,
  options,
  suggestedOptions,
  children,
  initialOption,
  isLoading,
  onChange,
}: SelectProps) => {
  const [inputValue, setInputValue] = useState(initialOption?.label);
  const [isFocused, setIsFocused] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTopOptions, setCurrentTopOptions] = useState(suggestedOptions);
  const [currentOptions, setCurrentOptions] = useState(options);
  const [keyEvent, setKeyEvent] = useState({ key: '', timeStamp: 0 });

  const { t } = useTranslation();
  const tooltipClearButton = t('actions.clear');
  const toggleSelectTooltip = isExpanded ? t('actions.collapse') : t('actions.expand');
  const loadingText = t('status.loading');

  const selectRef = useRef<HTMLDivElement>(null);
  const suffixContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = !inputValue && !selectedOption?.value ? placeholder : '';

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
    if (selectRef.current?.contains(event.relatedTarget)) {
      return;
    }
    setIsFocused(false);
    setIsExpanded(false);
    setCurrentOptions(options);
    setCurrentTopOptions(suggestedOptions);
    setInputValue(selectedOption?.label ?? '');
  };

  const handleClearButtonClick = () => {
    setSelectedOption(undefined);
    setInputValue('');
    setCurrentOptions(options);
    setCurrentTopOptions(suggestedOptions);
    setIsExpanded(true);
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
    if (options) {
      const filteredOptions = filterOptions(currentInputValue, options, MatchStrategy.AnyMatch);
      if (suggestedOptions) {
        const filteredTopOptions = filterOptions(
          currentInputValue,
          suggestedOptions,
          MatchStrategy.AnyMatch
        );
        setCurrentTopOptions(filteredTopOptions);
      }

      setCurrentOptions(filteredOptions);
    }
    if (currentInputValue === '') {
      setSelectedOption(undefined);
      setCurrentOptions(options);
      setCurrentTopOptions(suggestedOptions);
    }
    if (onChange) {
      onChange(currentInputValue);
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
      className={clsx(styles.select)}
      ref={selectRef}
      tabIndex={-1}
      onFocus={handleSelectFocus}
      onBlur={handleSelectBlur}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.select__controlContainer}>
        <FieldWrapper isFocused={isFocused} label={label}>
          <div
            className={clsx(
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
                  inputMode={isSearchable ? 'text' : 'none'}
                  role="combobox"
                  onFocus={() => {
                    inputRef.current?.select();
                    setIsInputFocused(true);
                  }}
                  onBlur={() => {
                    console.log('input blur');
                    setIsInputFocused(false);
                  }}
                  aria-expanded={isExpanded}
                  aria-haspopup="true"
                  aria-autocomplete="list"
                  aria-readonly={!isSearchable}
                />
              </div>
            </div>
            <div className={styles.select__suffixContainer} ref={suffixContainerRef}>
              {isLoading && <Spinner variant="inline" />}
              {isClearable && (inputValue || selectedOption?.value) && (
                <div className={clsx(styles.select__buttonWrap)}>
                  <IconButton
                    tooltip={tooltipClearButton}
                    onClick={handleClearButtonClick}
                    data-testid="clear-button"
                  >
                    <IconClose className={styles.select__buttonIcon} />
                  </IconButton>
                </div>
              )}
              {hasExpandCollapseButton && (
                <>
                  <div className={styles.select__divider}></div>
                  <div className={styles.select__buttonWrap}>
                    <IconButton
                      tooltip={toggleSelectTooltip}
                      onClick={handleExpandedButton}
                      data-testid="toggle-button"
                    >
                      <IconDirectionArrow
                        className={clsx(
                          styles.select__buttonIcon,
                          styles.select__iconDirectionArrow,
                          isExpanded && styles['select__iconDirectionArrow--isExpanded']
                        )}
                      />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </FieldWrapper>
      </div>
      {isExpanded && (
        <div className={clsx(styles.select__options)}>
          <SelectList
            options={currentOptions}
            suggestedOptions={currentTopOptions}
            keyEvent={keyEvent}
            onOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            noOptionsMessage={isLoading ? loadingText : undefined}
          >
            {children}
          </SelectList>
        </div>
      )}
    </div>
  );
};

export default Select;
