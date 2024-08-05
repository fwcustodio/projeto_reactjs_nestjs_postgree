import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#638ed4',
    },
    secondary: {
      main: '#fa9c2e',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
