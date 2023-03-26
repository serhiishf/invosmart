import styles from './FieldWrapper.module.scss';
import { FieldWrapperProps } from './types';

function FieldWrapper(props: FieldWrapperProps) {
  return (
    <div className={styles.mainWrap}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.field}>{props.children}</div>
    </div>
  );
}

export default FieldWrapper;
