import { ChangeEvent, KeyboardEvent } from 'react';

export interface InputHookRes {
  value: string;
  valueChangedHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  valid: boolean;
  keyDownHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
}
