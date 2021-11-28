import React, { useState } from 'react';
import { node } from 'prop-types';
import Paper from '@mui/material/Paper';


function HoverPaper({ children, ...otherProps }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      elevation={hovered ? 6 : 1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...otherProps}
    >
      {children}
    </Paper>
  );
}

HoverPaper.propTypes = {
  children: node.isRequired,
};

export default HoverPaper;