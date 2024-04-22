import React, { ReactNode, useContext } from 'react';
import { Box, Button, Container, Divider, Menu, MenuItem, Typography, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Person, Settings } from '@mui/icons-material';
import { logout } from '../services/auth.service';
import { useAuth } from '../provider/AuthProvider';
import { FullSizeContainer } from '../theme/basicComponent';

export interface IProps {
  children: ReactNode;
}

const StyledContainer = styled(FullSizeContainer)(() => ({
  justifyContent: 'flex-start',
  padding: 40,
  boxSizing: 'border-box',
}));

const Header = styled(Container)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '50px',
  cursor: 'pointer',
}));

const UserMenuButton = styled(Button)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '15px',
  borderRadius: '20px',
  paddingInline: '20px',
  color: 'black',
}));

const PageWrapper: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();

  // TODO factorie and create menu component
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/', { replace: true });
    handleMenuClose();
  };

  // console.log('pathname', pathname);
  return (
    <StyledContainer>
      <Header>
        <Button onClick={() => navigate('/', { replace: true })}>
          <Typography variant="h2">Logme</Typography>
        </Button>
        <UserMenuButton
          variant="outlined"
          id="basic-button"
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          <Person color="primary" />
          <Typography>{user?.username}</Typography>
        </UserMenuButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Header>

      {children}
    </StyledContainer>
  );
};

export default PageWrapper;
