import { FC, useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector, useInput } from '../../app/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createArticleAsync,
  selectError,
  selectEditorStatus,
  selectTags,
  setTag,
  updateArticleAsync,
} from './editorSlice';
import { selectArticle } from '../Articles/Article/articleSlice';
import { checkFormIsValid } from '../../utils/utility';

import styles from './EditorForm.module.css';
import SubmitButton from '../../components/UI/Buttons/SubmitButton';
import FormControl from '../../components/UI/FormControl';
import TextArea from '../../components/UI/Input/TextArea';
import TextInput from '../../components/UI/Input/TextInput';
import FormLabel from '../../components/UI/FormLabel';
import TagsInput from '../../components/UI/Input/TagsInput';
import InfoText from '../../components/UI/InfoText';

import type { ArticleReqBody } from '../../../../server/src/types/appRequest.types';
import type { ArticleProperties } from '../../../../server/src/types/appClasses';

const EditorForm: FC<{
  article: ArticleProperties | null;
  token: string;
  resourceId?: string;
}> = (props) => {
  const { article, token, resourceId } = props;

  const dispatch = useAppDispatch();

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const articlePageData = useAppSelector(selectArticle);
  const tags = useAppSelector(selectTags);
  const editorStatus = useAppSelector(selectEditorStatus);
  const errors = useAppSelector(selectError);

  const titleRes = useInput(resourceId ? article!.title : undefined);
  const descriptionRes = useInput(
    resourceId ? article!.description : undefined
  );
  const bodyRes = useInput(resourceId ? article!.body : undefined);
  const tagsInputRes = useInput();

  useEffect(() => {
    let valid = checkFormIsValid(
      titleRes,
      descriptionRes,
      bodyRes,
      tags,
      resourceId,
      article
    );
    setFormIsValid(valid);
  }, [titleRes, descriptionRes, bodyRes, article, tags, resourceId]);

  useEffect(() => {
    if (resourceId) {
      dispatch(setTag(article!.tagList));
    } else {
      dispatch(setTag([]));
    }
  }, [dispatch, resourceId, article]);

  useEffect(() => {
    if (editorStatus === 'success' && articlePageData && !errors) {
      navigate(
        `/article/${articlePageData.slug}-${articlePageData.resourceId}`,
        {
          state: { from: location },
        }
      );
    }
  }, [navigate, editorStatus, articlePageData, errors, location]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const reqBody: ArticleReqBody = {
      article: {
        title: titleRes.value,
        description: descriptionRes.value,
        body: bodyRes.value,
        tagList: tags,
      },
    };

    if (resourceId) {
      dispatch(updateArticleAsync({ token, reqBody, resourceId: resourceId! }));
    } else {
      dispatch(createArticleAsync({ token, reqBody }));
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <TextInput
          name='title'
          value={titleRes.value}
          required={true}
          minLength={6}
          maxLength={60}
          onChange={titleRes.valueChangedHandler}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>What's this article about?</FormLabel>
        <TextArea
          name='description'
          rows={3}
          cols={2}
          required
          value={descriptionRes.value}
          onChange={descriptionRes.valueChangedHandler}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='body'>Write your article</FormLabel>
        <TextArea
          name='body'
          rows={4}
          cols={2}
          required
          value={bodyRes.value}
          onChange={bodyRes.valueChangedHandler}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='tags-input'>Hashtags</FormLabel>
        <TagsInput
          name='tags-input'
          value={tagsInputRes.value}
          onChange={tagsInputRes.valueChangedHandler}
          onKeyDown={tagsInputRes.keyDownHandler}
        />
        <InfoText>Maximum number of tags is 30</InfoText>
        <InfoText>
          Each hashtag must be between 2 and 15, begin with # and contain just
          a-z,0-9, &amp;, -, _
        </InfoText>
        <InfoText>
          You can add a hashtag with space and remove with backspace or with
          click on the hashtag
        </InfoText>
      </FormControl>
      <SubmitButton className={styles.button} disabled={!formIsValid}>
        {resourceId ? 'Edit Article' : 'Create Article'}
      </SubmitButton>
    </form>
  );
};

export default EditorForm;
