import styles from './typography.module.css';
import { variantClassMap, type TypographyVariant } from './Typography.helpers';
import clsx from 'clsx';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  as?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
}

const Typography = ({
  variant = 'body',
  as: Component = 'p',
  children,
  style,
  className,
}: TypographyProps) => {
  const classNames = clsx(...(variantClassMap[variant] || 'body').split(' ').map((c) => styles[c]));

  return (
    <Component className={clsx(classNames, className, styles.lowercase)} style={style}>
      {children}
    </Component>
  );
};

export default Typography;
