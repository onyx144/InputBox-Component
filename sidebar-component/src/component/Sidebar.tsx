import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Typography,
  Switch
} from '@mui/material';
import {
  Home as HomeIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  PieChart as PieChartIcon,
  Favorite as FavoriteIcon,
  AccountBalanceWallet as WalletIcon,
  ExitToApp as ExitIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import styles from './user.module.scss'; // Імпорт стилів

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggleSidebar = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 250 : 88,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 250 : 88,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
        className={styles.sidebar} // Застосування стилю
      >
        <Box className={styles.header}>
          <Box className={styles.logo}>
            {open && (
              <>
                <img src="logo.png" alt="Logo" style={{ width: 40, borderRadius: 6 }} />
                <Box className={styles.logoText}>
                  <Typography variant="h6">Codinglab</Typography>
                  <Typography variant="body2">Web developer</Typography>
                </Box>
              </>
            )}
          </Box>
          <IconButton onClick={handleToggleSidebar} className={styles.toggleButton}>
            <ChevronRightIcon className={styles.open_icon} sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
          </IconButton>
        </Box>
        <List className={styles.menu_bar}>
          {[
            { icon: <HomeIcon />, text: 'Dashboard' },
            { icon: <BarChartIcon />, text: 'Revenue' },
            { icon: <NotificationsIcon />, text: 'Notifications' },
            { icon: <PieChartIcon />, text: 'Analytics' },
            { icon: <FavoriteIcon />, text: 'Likes' },
            { icon: <WalletIcon />, text: 'Wallets' },
            { icon: <ExitIcon />, text: 'Logout' },
          ].map((item, index) => (
            <ListItem key={index} disablePadding className={styles.menu_links}>
                <ListItemIcon className={styles.icon_test}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
        }}
      >
        <Typography variant="h4">Profile</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
