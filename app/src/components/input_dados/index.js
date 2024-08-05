import React from 'react';
import { InputMask as InputMaskOther } from '@react-input/mask';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

export const InputDados = (props) => {
  const { multiline, select, ...rest } = props;
  if (multiline) {
    return <TextField size='small' {...props} minRows={4} />;
  } else {
    if (select) {
      return <TextField size='small' {...props} />;
    } else {
      return (
        <InputMask size='small' {...rest}>
          {(inputProps) => <TextField size='small' {...inputProps} {...props} />}
        </InputMask>
      );
    }
  }
};

export default InputDados;
