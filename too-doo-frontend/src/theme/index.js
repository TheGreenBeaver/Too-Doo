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
  },

  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'normal',
        variant: 'outlined',
        size: 'small'
      }
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
    },

    MuiIconButton: {
      defaultProps: {
        color: 'primary'
      }
    },

    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: '1480px !important',
          background: blueGrey[700]
        },
        root: {
          minHeight: '100vh !important'
        }
      }
    }
  }
});

export default theme;