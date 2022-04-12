import { FC } from 'react';

import Input from './Input';

import type { InputHookRes } from '../../../app/types/hooks.types';

const TextInput: FC<{
  name: string;
  required?: boolean;
  onTextInput: InputHookRes;
}> = (props) => {
  const { name, required, onTextInput } = props;

  return (
    <Input type='text' name={name} required={required} onInput={onTextInput} />
  );
};

export default TextInput;
