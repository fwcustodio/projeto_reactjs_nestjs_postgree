import React, { useState, useEffect, useContext } from 'react';
import Sheet from '@mui/joy/Sheet';
import { Button, IconButton, Typography, FormLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSidebar } from '../../utils';
import { Box } from '@mui/material';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/joy/Avatar';
import { blue } from '@mui/material/colors';

import AuthContext from '../../contexts/auth';

const Header = (props: { pagina: string; modo: string }) => {
  const { pagina, modo } = props;

  const {
    auth,
    User,
    NomeUsuario,
    signOutContext,
    getMensagens,
    DEV,
  }: {
    auth: (Code: string | null, pagina: string, modo: string) => void;
    User: any;
    NomeUsuario: string;
    signOutContext: () => void;
    getMensagens?: () => void | any[];
    DEV: boolean;
  } = useContext(AuthContext) || {
    auth: () => {},
    User: null,
    NomeUsuario: '',
    signOutContext: () => {},
    getMensagens: () => {},
    DEV: false,
  };

  useEffect(() => {
    verificarAuth(); //Verifica se o usuário está logado
    exibirMensagens();

    return () => {};
  }, []);

  const verificarAuth = () => {
    if (User) {
      auth(null, pagina, modo);
    } else {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(String(prop)),
      });

      const code = (params as any).code;
      auth(code, pagina, modo); //Caso tenha acabado de logar e esta na Home do Painel
    }
  };

  const exibirMensagens = () => {
    const Mensagens = getMensagens();

    for (let index = 0; Mensagens && index < Mensagens.length; index++) {
      const MensagemAux = Mensagens[index];

      alert(MensagemAux);
    }
  };

  return (
    <Box>
      <Box height={50} justifyContent='space-around' display={'flex'} gap={10} p={1} sx={{ bgcolor: 'primary.main' }}>
        <Typography variant='h6' color='white' noWrap>
          SISTEMA DE CADASTRO DE TESTE
        </Typography>
        <Box display={'flex'}>
          <Box ml={1}>
            <Typography variant='h6' color='white'>
              {NomeUsuario}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
