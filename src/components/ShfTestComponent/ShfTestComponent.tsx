import { Input, Button, Link, Select } from '../ui';
import styles from './ShfTestComponent.module.scss';
import IconSearch from '../../assets/icons/search.svg?react';
import IconSettings from '../../assets/icons/settings.svg?react';

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
            PrefixIcon={IconSearch}
          />
          <Input
            label={'Password'}
            type="password"
            placeholder="Password"
            required
            isError={true}
          />
          <Input label="Simple input" placeholder="Required=false" />
          <Select></Select>
          <Select></Select>
          <Input
            label={'Password'}
            type="password"
            placeholder="Password"
            required
            isError={true}
          />
          <Input
            label={'Password'}
            type="password"
            placeholder="Password"
            required
            isError={true}
          />
          <Select
            topOptions={[{ label: 'toplabel', value: 'topvalue' }]}
            options={[
              { label: 'label1', value: 'value1' },
              { label: 'label2', value: 'value2' },
              { label: 'label3', value: 'value3' },
              {
                label: 'veryLong text overflow label  veryLong text overflow label',
                value: 'veryLong text overflow label veryLong text overflow label',
              },
            ]}
          >
            <Button tooltip="Tooltip">Add new items</Button>
          </Select>

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
