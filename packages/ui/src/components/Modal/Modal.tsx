import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';
import { backdropVariants, modalVariants } from './Modal.motion';
import clsx from 'clsx';

interface ModalProps {
  children?: ReactNode;
  modalContentStyle?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({ children, modalContentStyle, isOpen = true, onClose }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.modalWrapper}
          data-testid="wrapper_modal"
          onClick={handleBackdropClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.modalContentWrapper}
            data-testid="wrapper_modal_content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={clsx(styles.modalContent, modalContentStyle)}
              data-testid="content_modal"
              layout
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
