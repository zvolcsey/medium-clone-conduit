import { FC } from 'react';

import Input from './Input';

import type { InputHookRes } from '../../../app/types/hooks.types';

const PasswordInput: FC<{
  name: string;
  required?: boolean;
  onPasswordInput: InputHookRes;
}> = (props) => {
  const { name, required, onPasswordInput } = props;

  return (
    <>
      <Input
        type='password'
        name={name}
        required={required}
        onInput={onPasswordInput}
      />
    </>
  );
};

export default PasswordInput;
