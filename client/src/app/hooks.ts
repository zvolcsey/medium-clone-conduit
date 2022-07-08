import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag, selectTags } from '../features/Editor/editorSlice';
import { HASHTAG_MAX_LENGTH, HASHTAG_MIN_LENGTH } from './constant';
import { zxcvbn } from '@zxcvbn-ts/core';

import type { RootState, AppDispatch } from './store';
import type { InputHookRes, PasswordInputHookRes } from './types/hooks.types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInput = (data?: string): InputHookRes => {
  const dispatch = useAppDispatch();
  const [enteredValue, setEnteredValue] = useState<string>(data ? data : '');
  const tags = useAppSelector(selectTags);
  const tagRegex = /^#([a-z0-9&\-_]+)/g;

  let valid = enteredValue.length > 0;

  const valueChangedHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value !== ' ') {
      setEnteredValue(event.target.value);
    }
  };

  const reset = () => {
    setEnteredValue('');
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      if (
        enteredValue.length >= HASHTAG_MIN_LENGTH &&
        enteredValue.length <= HASHTAG_MAX_LENGTH &&
        tagRegex.test(enteredValue) &&
        !tags.includes(enteredValue.slice(1))
      ) {
        dispatch(addTag(enteredValue.slice(1)));
        reset();
      }
    }

    if (event.key === 'Backspace' && enteredValue.length === 0) {
      const tagsArray = [...tags];
      const tag = tagsArray.pop();
      if (tag) {
        dispatch(removeTag(tag));
      }
    }
  };

  return {
    value: enteredValue,
    valueChangedHandler,
    valid,
    keyDownHandler,
    reset,
  };
};

export const useUsernameInput = (): InputHookRes => {
  const usernameRes = useInput('');

  usernameRes.valid =
    usernameRes.value.length >= 6 && usernameRes.value.length <= 15;

  return {
    ...usernameRes,
  };
};

export const usePasswordInput = (): PasswordInputHookRes => {
  const passwordRes = useInput('');

  passwordRes.valid =
    passwordRes.value.length >= 8 && passwordRes.value.length <= 64;

  const score = zxcvbn(passwordRes.value).score;

  return {
    ...passwordRes,
    score,
  };
};
