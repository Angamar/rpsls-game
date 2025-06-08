import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import clsx from 'clsx';

interface ModalProps {
  children?: ReactNode;
  modalContentStyle?: string;
}

export default function Modal({ children, modalContentStyle }: ModalProps) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContentWrapper}>
        <div className={clsx(styles.modalContent, modalContentStyle)}>{children}</div>
      </div>
    </div>
  );
}
