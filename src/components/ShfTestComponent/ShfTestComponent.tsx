import { useState, ChangeEvent } from 'react';
import { FieldWrapper, InputBase, Input } from '../ui';
import styles from './ShfTestComponent.module.scss';

function ShfTestComponent() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    /*     
    //code for test error state
    if (e.target.value === '') {
      setError(true);
    } else {
      setError(false);
    } */
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleError(error: boolean) {
    error ? setError(true) : setError(false);
  }

  function handleBlur() {
    setIsFocused(false);
  }
  return (
    <div className={styles.mainWrap}>
      <div className={styles.parentComponent}>
        <Input disabled={false} label={'Password'} type={'password'} />
        {/* <FieldWrapper
          label="Email"
          error={error}
          focus={isFocused}
          disabled={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          setError={handleError}
        >
          <InputBase placeholder="Email" onChange={handleChange} value={value} />
        </FieldWrapper> */}
      </div>
    </div>
  );
}

export default ShfTestComponent;
