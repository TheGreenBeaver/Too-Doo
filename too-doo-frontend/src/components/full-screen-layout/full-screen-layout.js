import React from 'react';
import Header from '../header';
import Box from '@mui/material/Box';
import { matchToolbar } from '../../util/theme';
import { node } from 'prop-types';


function FullScreenLayout({ children }) {

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
        {children}
      </Box>
    </React.Fragment>
  );
}

FullScreenLayout.propTypes = {
  children: node.isRequired
};

export default FullScreenLayout;