import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Avatar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { isMobile } from 'react-device-detect';
import Logo from './Logo';

import DashboardSidebar from './DashboardSidebar';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const DashboardNavbar = ({ ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileView, setMobileView] = useState(false);
  const [path, checkPath] = useState(false);

  useEffect(() => {
    const result = location.pathname.match(/app/g) ? true : false;
    checkPath(result);
  }, [location.pathname]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: path ? 'primary' : '#F4F6F8'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <DashboardSidebar
            onMobileClose={() => setMobileView(false)}
            openMobile={mobileView}
          />
        </Box>
        {path && (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 0
            }}
          >
            {!isMobile && (
              <Avatar
                component={RouterLink}
                src={user.avatar}
                sx={{
                  cursor: 'pointer',
                  width: 35,
                  height: 35,
                  mx: 2
                }}
                to="/app/account"
              />
            )}
            <Hidden lgDown>
              <IconButton color="inherit" onClick={() => navigate('/login')}>
                <InputIcon />
              </IconButton>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                sx={{ p: 0 }}
                color="inherit"
                onClick={() => setMobileView(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
