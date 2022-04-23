import { useState, ChangeEvent } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import type { InputHookRes } from './types/hooks.types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInput = (): InputHookRes => {
  const [enteredValue, setEnteredValue] = useState('');

  const valid = enteredValue.length > 0;

  const valueChangedHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEnteredValue(event.target.value);
  };

  const reset = () => {
    setEnteredValue('');
  };

  return {
    value: enteredValue,
    valueChangedHandler,
    valid,
    reset,
  };
};
