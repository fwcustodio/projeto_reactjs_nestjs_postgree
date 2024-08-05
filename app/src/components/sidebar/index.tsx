import React, { useState, useEffect, useContext } from 'react';
import {
  GlobalStyles,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  LinearProgress,
  Input,
  Divider,
  Button,
  Card,
  Chip,
  List,
  Typography,
  Stack,
  styled,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { closeSidebar, FONT_SIZE } from '../../utils';

import { ROUTES } from '../../routes';

import AuthContext from '../../contexts/auth';

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    DEV,
  }: {
    DEV: boolean;
  } = useContext(AuthContext) || {
    DEV: false,
  };

  const Toggler = ({
    defaultExpanded = false,
    renderToggle,
    children,
  }: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
  }) => {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
      <React.Fragment>
        {renderToggle({ open, setOpen })}
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
            paddingLeft: 3,
          }}
        >
          {children}
        </Box>
      </React.Fragment>
    );
  };

  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    padding: 0,
    margin: 2,
    marginBottom: -2,
    marginLeft: 5,
  }));

  const ItemTexto = ({ text }: { text: string }) => (
    <ListItemStyled>
      <Typography style={{ fontSize: FONT_SIZE.mediumLarge }}>{text}</Typography>
    </ListItemStyled>
  );

  const ItemMenu = ({
    icon,
    text,
    onClick,
    KeyboardArrow,
    KeyboardArrowOpen,
  }: {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    KeyboardArrow?: React.ReactNode;
    KeyboardArrowOpen?: boolean;
  }) => (
    <ListItemStyled>
      <ListItemButton onClick={onClick ? onClick : () => {}}>
        {icon}
        <ItemTexto text={text} />
        {KeyboardArrow && <KeyboardArrowDownIcon sx={{ transform: KeyboardArrowOpen ? 'rotate(180deg)' : 'none' }} />}
      </ListItemButton>
    </ListItemStyled>
  );

  return (
    <Box
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 999,
        minHeight: '80dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 0,
        pt: 3,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        paddingTop: 5,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 999,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 0, alignItems: 'center' }}></Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 0.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '0px',
          }}
        >
          <ItemMenu
            onClick={() => {
              navigate(ROUTES.HOME_PAINEL);
            }}
            icon={<HomeRoundedIcon />}
            text='SIRS - Início'
          />

          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ItemMenu icon={<AssignmentRoundedIcon />} text='Segurança' onClick={() => setOpen(!open)} KeyboardArrow={true} KeyboardArrowOpen={open} />
            )}
          >
            <List sx={{ gap: 0, p: 0 }}>
              <ListItemStyled>
                <ListItemButton
                  onClick={() => {
                    navigate(ROUTES.USUARIOS);
                  }}
                >
                  <ItemTexto text={'Usuários'} />
                </ListItemButton>
              </ListItemStyled>

              <ListItemStyled>
                <ListItemButton
                  onClick={() => {
                    navigate(ROUTES.PERFIS);
                  }}
                >
                  <ItemTexto text={'Perfis'} />
                </ListItemButton>
              </ListItemStyled>
              <ListItemStyled>
                <ListItemButton
                  onClick={() => {
                    navigate(ROUTES.DEPARTAMENTOS);
                  }}
                >
                  <ItemTexto text={'Departamentos'} />
                </ListItemButton>
              </ListItemStyled>
              <ListItemStyled>
                <ListItemButton
                  onClick={() => {
                    navigate(ROUTES.ORGAOS_EMPRESAS);
                  }}
                >
                  <ItemTexto text={'Orgãos / Empresas'} />
                </ListItemButton>
              </ListItemStyled>
              <ListItemStyled>
                <ListItemButton
                  onClick={() => {
                    navigate(ROUTES.TIPOS_SERVIDORES);
                  }}
                >
                  <ItemTexto text={'Tipos de Servidores'} />
                </ListItemButton>
              </ListItemStyled>
            </List>
          </Toggler>

          {DEV && (
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ItemMenu icon={<SettingsRoundedIcon />} text='Configurações' onClick={() => setOpen(!open)} KeyboardArrow={true} KeyboardArrowOpen={open} />
              )}
            >
              <List sx={{ gap: 0, p: 0 }}>
                <ListItemStyled>
                  <ListItemButton
                    onClick={() => {
                      navigate(ROUTES.FUNCIONALIDADES);
                    }}
                  >
                    <ItemTexto text={'Funcionalidades'} />
                  </ListItemButton>
                </ListItemStyled>
                <ListItemStyled>
                  <ListItemButton
                    onClick={() => {
                      navigate(ROUTES.ACOES);
                    }}
                  >
                    <ItemTexto text={'Ações'} />
                  </ListItemButton>
                </ListItemStyled>
              </List>
            </Toggler>
          )}
        </List>
      </Box>
      <Divider />
    </Box>
  );
};

export default Sidebar;
