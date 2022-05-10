import { FC, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector, useInput } from '../../../app/hooks';
import {
  selectBioErrors,
  selectBioStatus,
  updateBioAsync,
} from '../settingsSlice';

import styles from './ChangeForm.module.css';
import SubmitButton from '../../../components/UI/Buttons/SubmitButton';
import FormControl from '../../../components/UI/FormControl';
import FormLabel from '../../../components/UI/FormLabel';
import TextArea from '../../../components/UI/Input/TextArea';

import type { UpdateUserReqBody } from '../../../../../server/src/types/appRequest.types';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangeBioForm: FC<{ username: string; bio?: string; token: string }> = (
  props
) => {
  const { username, bio, token } = props;

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const status = useAppSelector(selectBioStatus);
  const errors = useAppSelector(selectBioErrors);

  const bioRes = useInput(bio || undefined);
  const formIsValid = bioRes.value !== bio;

  useEffect(() => {
    if (status === 'success' && !errors) {
      navigate(`/profile/@${username}`, {
        state: { from: location },
      });
    }
  }, [dispatch, status, errors]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const bio = bioRes.value;

    const reqBody: UpdateUserReqBody = {
      user: {
        bio,
      },
    };

    dispatch(updateBioAsync({ token, reqBody }));
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FormControl className={styles['form-control']}>
        <FormLabel htmlFor='bio'>Bio</FormLabel>
        <TextArea
          name='bio'
          rows={4}
          cols={2}
          required
          value={bioRes.value}
          onChange={bioRes.valueChangedHandler}
        />
      </FormControl>
      <SubmitButton className={styles.button} disabled={!formIsValid}>
        Change Bio
      </SubmitButton>
    </form>
  );
};

export default ChangeBioForm;
