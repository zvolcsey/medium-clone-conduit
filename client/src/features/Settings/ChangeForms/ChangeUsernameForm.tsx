import { FC, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector, useInput } from '../../../app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  selectUsernameErrors,
  selectUsernameStatus,
  updateUsernameAsync,
} from '../settingsSlice';
import { logout } from '../../Auth/authSlice';

import styles from './ChangeForm.module.css';
import SubmitButton from '../../../components/UI/Buttons/SubmitButton';
import FormControl from '../../../components/UI/FormControl';
import FormLabel from '../../../components/UI/FormLabel';
import TextInput from '../../../components/UI/Input/TextInput';

import type { UpdateUserReqBody } from '../../../../../server/src/types/appRequest.types';

const ChangeUsernameForm: FC<{ username: string; token: string }> = (props) => {
  const { username, token } = props;

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const status = useAppSelector(selectUsernameStatus);
  const errors = useAppSelector(selectUsernameErrors);

  const usernameRes = useInput(username || undefined);
  const formIsValid = usernameRes.valid && usernameRes.value !== username;

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

    const username = usernameRes.value;

    const reqBody: UpdateUserReqBody = {
      user: {
        username,
      },
    };

    dispatch(updateUsernameAsync({ token, reqBody }));
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <TextInput
          name='username'
          value={usernameRes.value}
          required={true}
          minLength={6}
          maxLength={15}
          onChange={usernameRes.valueChangedHandler}
        />
      </FormControl>
      <SubmitButton className={styles.button} disabled={!formIsValid}>
        Change Username
      </SubmitButton>
    </form>
  );
};

export default ChangeUsernameForm;
