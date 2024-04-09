import { forwardRef, memo } from 'react';
import classNames from 'classnames';
import { TextOverflow } from 'constants/theme';
import IconCheckmark from '../../../assets/icons/checkmark.svg?react';
import styles from './Option.module.scss';
import { OptionProps, OptionTheme } from './types';

const Option = forwardRef((props: OptionProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    label,
    icon,
    isSelected = false,
    backgroundPalette = OptionTheme.OnGreyBackground,
    textOverflow = TextOverflow.Wrap,
    isFocused = false,
    ...rest
  }: OptionProps = props;

  return (
    <li
      tabIndex={-1}
      className={classNames(
        styles.option,
        isSelected && styles['option--isSelected'],
        styles[`option--backgroundPalette-${backgroundPalette}`],
        isFocused && styles[`option--backgroundPalette-${backgroundPalette}-isFocused`]
      )}
      ref={ref}
      {...rest}
    >
      <div className={styles.option__checkmarkContainer}>{isSelected && <IconCheckmark />}</div>
      <div className={styles.option__contentContainer}>
        {icon && <div className={styles.option__iconContainer}>{icon}</div>}
        <div className={classNames(styles.option__label, styles[`option__label--${textOverflow}`])}>
          {label}
        </div>
      </div>
    </li>
  );
});

export default memo(Option);
