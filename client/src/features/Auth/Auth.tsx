import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectError } from './authSlice';

import '../../index.css';
import styles from './Auth.module.css';
import Card from '../../components/UI/Card';
import AuthForm from './AuthForm';

import Errors from '../../components/UI/Error/Errors';

const Auth: FC<{ type: 'sign-in' | 'sign-up'; title: string }> = (props) => {
  const { type, title } = props;

  const error = useAppSelector(selectError);

  return (
    <Card className={styles.card}>
      <h1 className='centered'>{title}</h1>
      <Link to={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
        {type === 'sign-in' ? 'Need an account?' : 'Have an account?'}
      </Link>
      <Errors errors={error} className={styles.errors} />
      <AuthForm type={type} />
    </Card>
  );
};

export default Auth;
