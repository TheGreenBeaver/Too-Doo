import React from 'react';
import Header from '../header';
import Box from '@mui/material/Box';
import { matchToolbar } from '../../util/theme';
import { Outlet } from 'react-router-dom';


function FullScreenLayout() {

  return (
    <React.Fragment>
      <Header />
      <Box
        sx={{
          ...matchToolbar('paddingTop', v => `${v}px`),
          overflow: 'auto',
          height: 'fit-content'
        }}
      >
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

export default FullScreenLayout;