import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { FieldWrapper, InputBase, IconButton } from '../';
import ArrowIcon from '../../../assets/icons/arrowCheck.svg?react';
import CloseIcon from '../../../assets/icons/close.svg?react';

function Select(props: SelectProps) {
  const {
    isSearchable = false,
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

    const handleFocusIn = (event: FocusEvent) => {
      // Встановлюємо isFocused у true, коли компонент отримує фокус
      setIsFocused(true);
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Перевірка, чи фокус переміщується поза межі компоненту
      if (wrapper && !wrapper.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
      }
    };

    // Додавання обробників подій focusin та focusout безпосередньо на компонент
    wrapper?.addEventListener('focusin', handleFocusIn);
    wrapper?.addEventListener('focusout', handleFocusOut);

    // Видалення обробників подій при демонтуванні компонента
    return () => {
      wrapper?.removeEventListener('focusin', handleFocusIn);
      wrapper?.removeEventListener('focusout', handleFocusOut);
    };
  }, [wrapperRef]);

  const onClickControlHandler = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const onClickClearButtonHandler = () => {
    setInputValue('');
    setSelectedValue('');
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          onClick={onClickControlHandler}
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
                onChange={onChangeInputHandler}
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
                    <IconButton
                      tooltipMessage="TRANSLATE Clear"
                      onClick={onClickClearButtonHandler}
                    >
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
