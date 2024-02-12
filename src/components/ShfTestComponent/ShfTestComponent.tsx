import { useState, ChangeEvent } from 'react';
import { Input, Tooltip, Button } from '../ui';
import styles from './ShfTestComponent.module.scss';
import SearchIcon from '../../assets/icons/search.svg?react';

function ShfTestComponent() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');

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

  function handleClick(/* e: React.MouseEvent<HTMLButtonElement> */) {
    /* e.preventDefault(); */
  }

  return (
    <div className={styles.mainWrap}>
      <div className={styles.parentComponent}>
        <form action="" className={styles.form}>
          <Input
            label={'Email'}
            type={'email'}
            placeholder="Email"
            required
            isError
            errorMessage="Email is required!"
            PrefixIcon={SearchIcon}
          />
          <Input
            label={'Password'}
            type="password"
            placeholder="Password"
            required
            isError={true}
            errorMessage="Some text 3 word in row"
          />
          <Input label="Simple input" placeholder="Required=false" />
          <Tooltip tooltipMessage="Very big long text for yooltip with many many textr containing in this message which helps user understand what is w" />
          <div className={styles.buttonContainerWidthFull}>
            <Button isFullWidth={true}>
              <div>Button component Width</div>
            </Button>
          </div>
          <Button>
            <div>Button component</div>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ShfTestComponent;
