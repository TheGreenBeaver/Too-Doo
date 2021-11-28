import React from 'react';
import logo from '../../assets/img/logo--on-dark.svg';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '../../contexts/axios-context';
import { HTTP_ENDPOINTS } from '../../util/constants';
import { logOutAction } from '../../store/actions/account';
import './header.styles.css';


function Header() {
  const { username } = useSelector(state => state.account.userData);
  const { api } = useAxios();
  const dispatch = useDispatch();

  function logOut() {
    api(HTTP_ENDPOINTS.logOut).call()
      .then(() => dispatch(logOutAction()))
  }

  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={theme => ({
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
          }
        })}
      >
        <img
          src={logo}
          alt='logo'
          className='td-header_logo'
        />

        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          height='100%'
          position='absolute'
          sx={{ pr: 3 }}
          right={0}
        >
          <Typography sx={{ mr: 1 }}>
            Signed in as {username}
          </Typography>
          <Button
            variant='text'
            onClick={logOut}
            color='primary'
            sx={{
              color: 'primary.contrastText',
              '&:hover': {
                color: 'secondary.main'
              }
            }}
          >
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;