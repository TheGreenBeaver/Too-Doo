import { createTheme } from '@mui/material';
import { blueGrey, red, deepOrange, amber } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    },
    secondary: {
      main: red[500]
    },
    error: {
      main: deepOrange[600]
    },
    warning: {
      main: amber[700]
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

export default theme;