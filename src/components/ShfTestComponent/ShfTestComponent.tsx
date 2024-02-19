import { Input, Button, Link, Select } from '../ui';
import styles from './ShfTestComponent.module.scss';
import SearchIcon from '../../assets/icons/search.svg?react';

function ShfTestComponent() {
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
            PrefixIcon={SearchIcon}
          />
          <Input
            label={'Password'}
            type="password"
            placeholder="Password"
            required
            isError={true}
          />
          <Input label="Simple input" placeholder="Required=false" />
          <Select />
          <Link href="https://www.google.com" target="blank">
            Forgot password?
          </Link>
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
