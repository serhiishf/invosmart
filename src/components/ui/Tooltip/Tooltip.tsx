import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';
import clsx from 'clsx';

const Tooltip = ({ message, children, ...rest }: TooltipProps) => {
  return (
    <div className={clsx(styles.tooltip)} {...rest}>
      {children}
      <div className={clsx(styles.tooltip__message)}>{message}</div>
    </div>
  );
};

export default Tooltip;

/* const [isTooltipOpen, setIsTooltipOpen] = useState(false);

const { refs, floatingStyles, context } = useFloating({
  placement: 'bottom',
  strategy: 'absolute',
  middleware: [shift(), offset(10)],
  onOpenChange: setIsTooltipOpen,
});

const hoverInteraction = useHover(context, {
  mouseOnly: true,
});

const focusInteraction = useFocus(context);

const { getReferenceProps, getFloatingProps } = useInteractions([
  hoverInteraction,
  focusInteraction,
]); */
