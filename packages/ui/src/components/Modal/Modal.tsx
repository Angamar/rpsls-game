import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import clsx from 'clsx';

interface ModalProps {
  children?: ReactNode;
  modalContentStyle?: string;
}

export default function Modal({ children, modalContentStyle }: ModalProps) {
  return (
    <div className={styles.modalWrapper} data-testId="wrapper_modal">
      <div className={styles.modalContentWrapper} data-testId="wrapper_modal_content">
        <div className={clsx(styles.modalContent, modalContentStyle)} data-testId="content_modal">
          {children}
        </div>
      </div>
    </div>
  );
}
