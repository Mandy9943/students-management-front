// Dialog.jsx

import React, { KeyboardEvent, PropsWithChildren } from 'react';
import styles from './Dialog.module.scss';

const Dialog = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>) => {
  if (!isOpen) return null;
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="button" tabIndex={0} onKeyDown={handleKeyDown}>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div className={styles.dialog} onClick={handleDialogClick} onKeyDown={handleKeyDown} role="dialog" tabIndex={-1}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
