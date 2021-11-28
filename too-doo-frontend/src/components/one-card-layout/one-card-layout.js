import React from 'react';
import logo from '../../assets/img/logo.svg';
import CenterBox from '../center-box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { node } from 'prop-types';


function OneCardLayout({ children }) {

  return (
    <CenterBox minHeight='100vh' sx={{ p: 3 }}>
      <Card sx={{ padding: theme => theme.spacing(2, 3, 1, 3), width: 450 }}>
        <CardMedia
          image={logo}
          sx={{ height: 100, backgroundSize: 'contain !important' }}
        />
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </CenterBox>
  );
}

OneCardLayout.propTypes = {
  children: node.isRequired
};

export default OneCardLayout;