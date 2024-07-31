import React from 'react';
import styles from './Divider.module.scss';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => <div className={`${styles.divider} ${className || ''}`} />;

export default Divider;
