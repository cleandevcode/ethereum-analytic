import { useEffect, useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Hidden, List, Avatar } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import InputIcon from '@material-ui/icons/Input';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/queries',
    icon: UsersIcon,
    title: 'Queries'
  },
  {
    href: '/app/projects',
    icon: ShoppingBagIcon,
    title: 'Projects'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/login',
    icon: InputIcon,
    title: 'Logout'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [menus, setMenus] = useState(items);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    const temp = isMobile ? items : items.slice(0, items.length - 1);
    setMenus(temp);
  }, [location.pathname]);

  const content = (
    <Box>
      <Box sx={{ p: 1 }}>
        <List sx={{ display: 'flex' }}>
          {menus.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              hiddenIcon={true}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  const mobileContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 45,
            height: 45,
            mx: 2
          }}
          to="/app/account"
        />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {menus.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              hiddenIcon={false}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {mobileContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>{content}</Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
