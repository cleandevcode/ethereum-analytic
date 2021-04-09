import { AppBar } from '@material-ui/core';
import MainMenu from './DashboardNavbar';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <MainMenu />
  </AppBar>
);

export default MainNavbar;
