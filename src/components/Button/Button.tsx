import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <button type="button" {...props} className={`${styles.button} ${props.className}`}>
    {icon}
    <span className="button-text">{children}</span>
  </button>
);

export default Button;
