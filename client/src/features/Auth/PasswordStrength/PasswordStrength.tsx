import { FC } from 'react';

import styles from './PasswordStrength.module.css';

const PasswordStrength: FC<{ password: string; score: number }> = (props) => {
  const { password, score } = props;

  const passwordNotEmpty = password.length > 0;

  let passwordStrengthBlocks = (
    <div className={styles['password-strength-blocks']}>
      <div className={`${styles.score} ${styles.weak}`}></div>
      <div className={styles.score}></div>
      <div className={styles.score}></div>
      <div className={styles.score}></div>
    </div>
  );

  let passwordStrengthText = (
    <p className={`${styles['password-strength-text']} ${styles.weak}`}>Weak</p>
  );

  switch (score) {
    case 2:
      passwordStrengthBlocks = (
        <div className={styles['password-strength-blocks']}>
          <div className={`${styles.score} ${styles.average}`}></div>
          <div className={`${styles.score} ${styles.average}`}></div>
          <div className={styles.score}></div>
          <div className={styles.score}></div>
        </div>
      );
      passwordStrengthText = (
        <p className={`${styles['password-strength-text']} ${styles.average}`}>
          Average
        </p>
      );
      break;
    case 3:
      passwordStrengthBlocks = (
        <div className={styles['password-strength-blocks']}>
          <div className={`${styles.score} ${styles.strong}`}></div>
          <div className={`${styles.score} ${styles.strong}`}></div>
          <div className={`${styles.score} ${styles.strong}`}></div>
          <div className={styles.score}></div>
        </div>
      );
      passwordStrengthText = (
        <p className={`${styles['password-strength-text']} ${styles.strong}`}>
          Strong
        </p>
      );
      break;
    case 4:
      passwordStrengthBlocks = (
        <div className={styles['password-strength-blocks']}>
          <div className={`${styles.score} ${styles['very-strong']}`}></div>
          <div className={`${styles.score} ${styles['very-strong']}`}></div>
          <div className={`${styles.score} ${styles['very-strong']}`}></div>
          <div className={`${styles.score} ${styles['very-strong']}`}></div>
        </div>
      );
      passwordStrengthText = (
        <p
          className={`${styles['password-strength-text']} ${styles['very-strong']}`}
        >
          Very Strong
        </p>
      );
      break;
  }

  return (
    <div className={styles.container}>
      {passwordNotEmpty && passwordStrengthBlocks}
      {passwordNotEmpty && passwordStrengthText}
    </div>
  );
};

export default PasswordStrength;
