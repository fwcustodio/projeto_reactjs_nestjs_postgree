import * as React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxPrincipal = styled(Box)(({ theme }) => ({ width: '100%' }));
export const BoxSuperior = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
}));
export const BoxGrid = styled(Box)(({ theme }) => ({
  marginTop: 20,
}));
export const BoxInferior = styled(Box)(({ theme }) => ({}));
