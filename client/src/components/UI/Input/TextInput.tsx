import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import Input from './Input';

const TextInput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return <Input type='text' {...props} />;
};

export default TextInput;
