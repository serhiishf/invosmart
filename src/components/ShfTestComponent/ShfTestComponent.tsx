import { FieldWrapper } from '../ui';
import styles from './ShfTestComponent.module.scss';

function ShfTestComponent() {
  return (
    <div className={styles.mainWrap}>
      <div className={styles.parentComponent}>
        <FieldWrapper label="Name">
          <div className={styles.testInput}></div>
        </FieldWrapper>
      </div>
    </div>
  );
}

export default ShfTestComponent;
