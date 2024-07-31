import { Button } from '@/components/Button';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import styles from './ConfirmationDialog.module.scss';

const Dialog = dynamic(() => import('@/components/Modal').then(mod => mod.Dialog), {
  ssr: false,
});

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, message }) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <h3 className={styles.dialogTitle}>Confirmation</h3>
    <p>{message}</p>
    <div className={styles.actions}>
      <Button onClick={onConfirm}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </div>
  </Dialog>
);

export default ConfirmationDialog;
