import { FC, FormEvent, useEffect } from 'react';
import {
  createCommentAsync,
  selectError,
  selectStatus,
} from './newCommentSlice';
import {
  useAppDispatch,
  useAppSelector,
  useInput,
} from '../../../../../app/hooks';

import styles from './NewCommentForm.module.css';
import FormControl from '../../../../../components/UI/FormControl';
import FormLabel from '../../../../../components/UI/FormLabel';
import TextArea from '../../../../../components/UI/Input/TextArea';
import SubmitButton from '../../../../../components/UI/SubmitButton';

import type { CommentReqBody } from '../../../../../../../server/src/types/appRequest.types';
import type { CreateCommentPayload } from '../../../../../app/types/redux.types';

const NewCommentForm: FC<{
  articleResourceId: string;
  token: string | null;
}> = (props) => {
  const { articleResourceId, token } = props;

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const errors = useAppSelector(selectError);

  const commentRes = useInput();
  const formIsValid = commentRes.valid;

  useEffect(() => {
    if (status === 'success' && !errors) {
      commentRes.reset();
    }
  }, [status, errors]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const body = commentRes.value;

    const reqData: CommentReqBody = {
      comment: {
        body,
      },
    };

    const payload: CreateCommentPayload = {
      token: token!,
      articleResourceId,
      reqData,
    };

    dispatch(createCommentAsync(payload));
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FormControl>
        <FormLabel htmlFor='comment'>New Comment</FormLabel>
        <TextArea
          name='comment'
          rows={2}
          cols={2}
          required
          onInput={commentRes}
        />
      </FormControl>
      <SubmitButton className={styles.button} disabled={!formIsValid}>
        Add Comment
      </SubmitButton>
    </form>
  );
};

export default NewCommentForm;
