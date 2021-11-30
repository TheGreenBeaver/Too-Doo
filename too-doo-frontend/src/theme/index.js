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
      }
    },

    MuiIconButton: {
      defaultProps: {
        color: 'primary'
      }
    },

    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          background: blueGrey[700],
          minHeight: '100vh !important',
          minWidth: 514
        }
      }
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100vh'
        }
      }
    },

    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          '&:first-of-type': {
            marginTop: 0
          }
        }
      }
    }
  }
});

export default theme;