import styles from './typography.module.css';
import { variantClassMap, type TypographyVariant } from './Typography.helpers';

interface TypographyProps {
    children: React.ReactNode;
    variant?: TypographyVariant;
    as?: React.ElementType;
    style?: React.CSSProperties;
}

const Typography = ({
    variant = 'body',
    as: Component = 'p',
    children,
    style,
}: TypographyProps) => (
    <Component
        className={styles[variantClassMap[variant] || 'body']}
        style={style}
    >
        {children}
    </Component>
);

export default Typography;