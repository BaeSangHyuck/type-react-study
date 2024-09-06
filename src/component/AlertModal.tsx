import React from "react";
import styles from "../style/alertModal.module.css";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>확인</button>
      </div>
    </div>
  );
};

export default AlertModal;
