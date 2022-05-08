import { FC, FormEvent, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, useInput } from '../../app/hooks';
import { selectError, signInAsync, signUpAsync } from './authSlice';

import '../../index.css';
import styles from './AuthForm.module.css';
import SubmitButton from '../../components/UI/Buttons/SubmitButton';
import InfoText from '../../components/UI/InfoText';
import FormControl from '../../components/UI/FormControl';
import FormLabel from '../../components/UI/FormLabel';
import TextInput from '../../components/UI/Input/TextInput';
import PasswordInput from '../../components/UI/Input/PasswordInput';

import type { AuthUserReqBody } from '../../../../server/src/types/appRequest.types';

const AuthForm: FC<{
  type: 'sign-in' | 'sign-up';
}> = (props) => {
  const { type } = props;
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);
  const location = useLocation();

  const usernameRes = useInput();
  const passwordRes = useInput();
  const confirmPasswordRes = useInput();

  useEffect(() => {
    return () => {
      usernameRes.reset();
      passwordRes.reset();
      confirmPasswordRes.reset();
    };
  }, [location.pathname]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const username = usernameRes.value;
    const password = passwordRes.value;
    const confirmPassword = confirmPasswordRes.value;

    if (type === 'sign-up') {
      if (password !== confirmPassword) {
        return;
      }
    }

    const reqData: AuthUserReqBody = {
      user: {
        username,
        password,
      },
    };

    if (type === 'sign-in') {
      await dispatch(signInAsync(reqData));
    } else {
      await dispatch(signUpAsync(reqData));
    }

    if (!error) {
      usernameRes.reset();
      passwordRes.reset();
      confirmPasswordRes.reset();
      return <Navigate to='/feed' state={{ from: location }} replace />;
    }

    return;
  };

  const usernameInfo = type === 'sign-up' && (
    <>
      <InfoText>Username must be between 6 and 15 characters</InfoText>
      <InfoText>
        {`Username can contain the following characters A-Z a-z _ 0-9`}
      </InfoText>
    </>
  );

  const passwordInfo = type === 'sign-up' && (
    <>
      <InfoText>Password must be between 8 and 15 characters</InfoText>
      <InfoText>
        {`Password can contain the following characters A-Z a-z 0-9 and minimum 1 special character`}
      </InfoText>
      <InfoText>{`Allowed special characters: ! # $ % & + - ? @ _ ~`}</InfoText>
    </>
  );

  let buttonName = type === 'sign-in' ? 'Sign In' : 'Sign Up';

  return (
    <form onSubmit={submitHandler} className={styles.form} noValidate>
      <FormControl>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <TextInput
          name='username'
          required
          value={usernameRes.value}
          onChange={usernameRes.valueChangedHandler}
        />
        {usernameInfo}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <PasswordInput
          name='password'
          required
          value={passwordRes.value}
          onChange={passwordRes.valueChangedHandler}
        />
        {passwordInfo}
      </FormControl>
      {type === 'sign-up' && (
        <FormControl>
          <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
          <PasswordInput
            name='confirm-password'
            required
            value={confirmPasswordRes.value}
            onChange={confirmPasswordRes.valueChangedHandler}
          />
        </FormControl>
      )}
      <SubmitButton className={styles.button}>{buttonName}</SubmitButton>
    </form>
  );
};

export default AuthForm;
