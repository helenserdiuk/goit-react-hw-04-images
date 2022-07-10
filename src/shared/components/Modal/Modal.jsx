import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  const { children, onClose } = props;

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => window.removeEventListener('keydown', handleClose);
  });

  const handleClose = e => {
    if (e.code === 'Escape') {
      return onClose();
    }
    if (e.currentTarget === e.target) {
      return onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleClose}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
