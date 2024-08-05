import MenuIcon from '@mui/icons-material/Menu';
import { GlobalStyles, Box, IconButton } from '@mui/material';
import { toggleSidebar } from '../../utils';

const Header = () => {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 1000,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton style={{ padding: 0 }} onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
