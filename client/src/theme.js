import { createTheme } from '@mui/material';

let theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  palette: {
    text: {
      primary: '#333',
      secondary: '51,51,51',
    },
    type: 'light',
    primary: {
      main: '#334ACC',
      dark: '#223289',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E8EAF6',
      dark: '#C5CAE9',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    error: {
      main: '#FF5D5D',
      light: '#FCECE6',
      contrastText: '#fff',
    },
    success: {
      main: '#00A980',
      dark: '#B28C09',
      light: '#DBEBDB',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA726',
      light: '#FFF5D2',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F8F8',
      main: '#fff',
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: '2.25rem',
      letterSpacing: '-0.1rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.074rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.728rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.44rem',
    },
    h5: {
      fontSize: '1.44rem',
    },
    h6: {
      fontSize: '1.44rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
    p: {
      color: `rgba(${theme.palette.text.secondary},0.5)`,
    },
    subtitle1: {
      fontSize: '0.9rem',
      color: `rgba(${theme.palette.text.secondary},0.5)`,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontFamily: 'Inter, sans-serif',
          minWidth: 0,
          minHeight: 0,
          cursor: 'pointer',
          padding: '6px 12px',
          '&:hover,&:active': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: `rgba(${theme.palette.text.secondary}, 0.07)`,
          },
        },
        startIcon: {
          '*:nth-of-type(1)': {
            fontSize: '15px',
          },
        },
        endIcon: {
          paddingTop: '6px',
          paddingBottom: '6px',
          marginRight: '0',
          marginLeft: '0',
          '*:nth-of-type(1)': {
            fontSize: '11px',
          },
        },
        outlined: {
          '&.Mui-disabled': {
            backgroundColor: theme.palette.background.main,
          },
        },
        containedPrimary: {
          fontWeight: 500,
          '&:hover,&:active': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        containedError: {
          fontWeight: 500,
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
          },
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
          },
        },
        outlinedPrimary: {
          fontWeight: 500,
          backgroundColor: theme.palette.secondary.main,
          border: 'none',
          '&:hover,&:active': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
            border: 'none',
          },
          '&:disabled': {
            backgroundColor: `rgba(${theme.palette.text.secondary}, 0.07)`,
            border: 'none',
          },
        },
        outlinedError: {
          fontWeight: 500,
          border: `1px solid ${theme.palette.error.main}`,
          '&:hover,&:active': {
            backgroundColor: theme.palette.error.light,
          },
        },
        outlinedSuccess: {
          fontWeight: 600,
          border: `1px solid ${theme.palette.success.main}`,
          '&:hover, &:active': {
            backgroundColor: theme.palette.success.light,
          },
        },
        outlinedWarning: {
          fontWeight: 600,
          border: `1px solid ${theme.palette.warning.main}`,
          '&:hover, &:active': {
            backgroundColor: theme.palette.warning.light,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.grey['500'],
          ':hover': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            borderBottom: '2px solid #0666eb',
            color: theme.palette.primary.main,
          },
          '.MuiTypography-root': {
            fontWeight: '500',
            fontSize: '14px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#33333350',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '40px 32px',
          border: 'none',
          boxShadow: theme.shadows[3],
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '0',
          fontSize: '24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#F9FAFD',
          },
        },
      },
    },
  },
});

export { theme };
