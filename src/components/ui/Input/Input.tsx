import { useState, ChangeEvent } from 'react';
import { FieldWrapper, InputBase } from '../';
import { InputTypeProps } from './types';
import styles from './Input.module.scss';

function Input(props: InputTypeProps) {
  const {
    id,
    type = 'text',
    name,
    label,
    value,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    required = false,
    disabled = false,
    readonly = false,
  } = props;
  return (
    <FieldWrapper label={label}>
      <InputBase></InputBase>
    </FieldWrapper>
  );
}

export default Input;
