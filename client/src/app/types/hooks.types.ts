import { FocusEvent, ChangeEvent } from 'react';

export interface InputHookRes {
  value: string;
  valueChangedHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  valid: boolean;
  reset: () => void;
}
