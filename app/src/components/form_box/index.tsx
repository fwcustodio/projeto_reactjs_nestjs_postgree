import { Box, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxPrincipal = styled(FormControl)(({ theme }) => ({
  width: '50%',
  minWidth: 350,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 30,
}));

export const BoxBotoes = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  marginTop: 20,
}));
