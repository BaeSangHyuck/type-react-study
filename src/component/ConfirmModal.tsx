import React from "react";
import styles from "../style/confirmModal.module.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>확인</button>
          <button onClick={onCancel} className={styles.cancelButton}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
