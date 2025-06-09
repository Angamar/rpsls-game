import styles from './typography.module.css';
import { variantClassMap, type TypographyVariant } from './Typography.helpers';
import clsx from 'clsx';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  as?: React.ElementType;
  className?: string;
  dataTestId?: string;
}

const Typography = ({
  variant = 'body',
  as: Component = 'p',
  children,
  className,
  dataTestId,
  ...rest
}: TypographyProps) => {
  const classNames = clsx(...(variantClassMap[variant] || 'body').split(' ').map((c) => styles[c]));

  return (
    <Component
      className={clsx(classNames, className, styles.lowercase)}
      data-testid={dataTestId || 'component_typography'}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography;
