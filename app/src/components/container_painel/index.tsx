import * as React from 'react';
import { CssBaseline, Button, IconButton, Typography, FormLabel, Box, Breadcrumbs, Link } from '@mui/material';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Sidebar from '../sidebar';
import HeaderMobile from '../header_mobile';
import Header from '../header';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import { ROUTES } from '../../routes';
import { FONT_SIZE, MODOS } from '../../utils';

const ContainerPainel = (props: { children: any; pagina?: string; pagina_acima?: string; link_pagina_acima?: string; modo?: string }) => {
  const { children, pagina, pagina_acima, link_pagina_acima, modo } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <HeaderMobile />
      <Header pagina={(pagina ?? pagina_acima) || ''} modo={modo ?? MODOS.LISTAR} />

      <Box sx={{ display: 'flex', minHeight: '80dvh' }}>
        <Sidebar />
        <Box
          component='main'
          className='MainContent'
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '80dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs separator={<ChevronRightRoundedIcon fontSize='small' />} sx={{ pl: 0 }}>
              <Link underline='none' color='neutral' href={ROUTES.HOME_PAINEL} aria-label='Home'>
                <HomeRoundedIcon />
              </Link>

              {pagina_acima && (
                <Link underline='hover' color='neutral' href={link_pagina_acima} fontSize={FONT_SIZE.medium} fontWeight={500}>
                  {pagina_acima}
                </Link>
              )}

              <Typography color='primary' fontWeight={500} fontSize={FONT_SIZE.medium} style={{ textTransform: modo ? 'capitalize' : 'none' }}>
                {modo ?? pagina}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography component='h1' style={{ fontWeight: 'bold', fontSize: FONT_SIZE.extraLarge, textTransform: modo ? 'capitalize' : 'none' }}>
              {modo ?? pagina}
            </Typography>
          </Box>
          <Box sx={{ margin: '1%', display: 'flex', justifyContent: 'center' }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ContainerPainel;
