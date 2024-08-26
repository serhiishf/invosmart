import styles from './Tooltip.module.scss';
import { forwardRef } from 'react';
import { TooltipProps } from './types';
import clsx from 'clsx';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ tooltipMessage, ...rest }: TooltipProps, ref) => {
    return (
      <div {...rest} ref={ref}>
        <div className={clsx(styles.tooltip)}>
          <div>{tooltipMessage}</div>
        </div>
      </div>
    );
  }
);

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
