import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './MenuButton.module.css';
import PrimaryButton from './PrimaryButton';

const MenuButton: FC<{ onClick: () => void }> = (props) => {
  const { onClick } = props;
  return (
    <PrimaryButton className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={faBars} />
      <span>Menu</span>
    </PrimaryButton>
  );
};

export default MenuButton;
