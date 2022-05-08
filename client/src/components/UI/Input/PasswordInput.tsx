import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import Input from './Input';

const PasswordInput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return <Input type='password' {...props} />;
};

export default PasswordInput;
