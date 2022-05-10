import { FC, FormEvent, useEffect } from 'react';
import { useInput, useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  selectPasswordErrors,
  selectPasswordStatus,
  updatePasswordAsync,
} from '../settingsSlice';
import { logout } from '../../Auth/authSlice';

import styles from './ChangeForm.module.css';
import SubmitButton from '../../../components/UI/Buttons/SubmitButton';
import FormControl from '../../../components/UI/FormControl';
import FormLabel from '../../../components/UI/FormLabel';
import PasswordInput from '../../../components/UI/Input/PasswordInput';

import type { UpdateUserReqBody } from '../../../../../server/src/types/appRequest.types';

const ChangePasswordForm: FC<{ token: string }> = (props) => {
  const { token } = props;

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const status = useAppSelector(selectPasswordStatus);
  const errors = useAppSelector(selectPasswordErrors);

  const passwordRes = useInput();
  const confirmPasswordRes = useInput();
  const formIsValid =
    passwordRes.valid &&
    confirmPasswordRes.valid &&
    passwordRes.value === confirmPasswordRes.value;

  useEffect(() => {
    if (status === 'success' && !errors) {
      navigate(`/sign-in`, {
        state: { from: location },
      });
      dispatch(logout());
    }
  }, [dispatch, status, errors]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const password = passwordRes.value;

    const reqBody: UpdateUserReqBody = {
      user: {
        password,
      },
    };

    dispatch(updatePasswordAsync({ token, reqBody }));
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor='password'>New Password</FormLabel>
        <PasswordInput
          name='password'
          value={passwordRes.value}
          required={true}
          minLength={8}
          maxLength={15}
          onChange={passwordRes.valueChangedHandler}
        />
      </FormControl>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor='confirm-password'>Confirm New Password</FormLabel>
        <PasswordInput
          name='confirm-password'
          value={confirmPasswordRes.value}
          required={true}
          minLength={6}
          maxLength={15}
          onChange={confirmPasswordRes.valueChangedHandler}
        />
      </FormControl>
      <SubmitButton className={styles.button} disabled={!formIsValid}>
        Change Password
      </SubmitButton>
    </form>
  );
};

export default ChangePasswordForm;
