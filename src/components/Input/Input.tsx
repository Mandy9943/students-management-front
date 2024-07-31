import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} className={styles.input} {...props} />
));

Input.displayName = 'Input';

export default Input;
