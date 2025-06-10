import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import clsx from 'clsx';

interface ModalProps {
  children?: ReactNode;
  modalContentStyle?: string;
}

export default function Modal({ children, modalContentStyle }: ModalProps) {
  return (
    <div className={styles.modalWrapper} data-testid="wrapper_modal">
      <div className={styles.modalContentWrapper} data-testid="wrapper_modal_content">
        <div className={clsx(styles.modalContent, modalContentStyle)} data-testid="content_modal">
          {children}
        </div>
      </div>
    </div>
  );
}
