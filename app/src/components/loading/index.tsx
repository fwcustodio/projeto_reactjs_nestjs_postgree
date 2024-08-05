import * as React from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Height, Opacity } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

const Loading: React.FC = () => {
  return (
    <Box
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: grey[50], zIndex: 10000, opacity: 0.5 }}
      display={'flex'}
      justifyContent={'center'}
      m={20}
    ></Box>
  );
};

export default Loading;

//<text style={{ fontWeight: 'bold', alignSelf: 'center', opacity: 2, color: '#117845', paddingBottom: 80 }}>LOADING...</text>
