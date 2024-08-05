import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const SystemCheck: React.FC = (props) => {
  const [Inicio, setInicio] = useState(true);

  useEffect(() => {}, [Inicio]);

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Teste do OpenShif de Liveness
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SystemCheck;
