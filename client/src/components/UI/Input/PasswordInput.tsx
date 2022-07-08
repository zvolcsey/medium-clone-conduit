import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './PasswordInput.module.css';
import Input from './Input';
import Button from '../Buttons/Button';

const PasswordInput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const [inputType, setInputType] = useState<string>('password');

  const showPassword = () => {
    setInputType('input');
  };

  const hidePassword = () => {
    setInputType('password');
  };

  return (
    <div className={styles.container}>
      <Input type={inputType} {...props} />
      <Button
        className={styles['toggle-password-btn']}
        onClick={inputType === 'password' ? showPassword : hidePassword}
      >
        {inputType === 'password' ? (
          <FontAwesomeIcon icon={faEye} className={styles['eye-icon']} />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} className={styles['eye-icon']} />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
