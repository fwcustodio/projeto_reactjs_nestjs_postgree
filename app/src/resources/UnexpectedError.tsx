import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const UnexpectedError: React.FC = ({ error }: any) => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => setOpen(false);

  return (
    <Backdrop open={open}>
      <Paper>
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <br />
        <Button variant='contained' onClick={handleClose}>
          Fechar
        </Button>
      </Paper>
    </Backdrop>
  );
};

export default UnexpectedError;
