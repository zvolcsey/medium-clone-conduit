import { AxiosRequestHeaders } from 'axios';

import type { ArticleProperties } from '../../../server/src/types/appClasses';
import type { InputHookRes } from '../app/types/hooks.types';
import type { EditorType } from '../app/types/redux.types';

export const createRequestHeaders = (token: string | null) => {
  let headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' };

  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  }

  return headers;
};

const checkFieldsAreValid = (
  title: InputHookRes,
  description: InputHookRes,
  body: InputHookRes,
  tags: string[]
) => {
  let valid = false;
  if (title.valid && description.valid && body.valid && tags.length < 30) {
    valid = true;
  }
  return valid;
};

const checkFieldsAreDefault = (
  title: InputHookRes,
  description: InputHookRes,
  body: InputHookRes,
  tags: string[],
  article: ArticleProperties
) => {
  let isDefault = false;

  if (tags.length === article.tagList.length) {
    isDefault = tags.every((tag) => article.tagList.includes(tag));

    if (!isDefault) {
      return false;
    }
  }

  if (tags.length !== article.tagList.length) {
    return false;
  }

  if (
    title.value === article.title &&
    description.value === article.description &&
    body.value === article.body
  ) {
    isDefault = true;
  } else {
    isDefault = false;
  }
  return isDefault;
};

export const checkFormIsValid = (
  title: InputHookRes,
  description: InputHookRes,
  body: InputHookRes,
  tags: string[],
  resourceId: string | undefined,
  article: ArticleProperties | null
) => {
  let formIsValid = false;

  formIsValid = checkFieldsAreValid(title, description, body, tags);

  if (resourceId && article && formIsValid) {
    let isDefault = checkFieldsAreDefault(
      title,
      description,
      body,
      tags,
      article
    );
    formIsValid = !isDefault;
  }
  return formIsValid;
};
