import { createTheme } from '@mui/material';
import { colors } from './customColors';
import { BorderColor } from '@mui/icons-material';
// import { colors } from './colors';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: colors.main,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.dark,
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.main,
              },
            },
            '&:hover:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.light,
              },
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.dark,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '.MuiFormLabel-root': {
            color: 'red',
          },
          '.MuiSelect-select': {
            color: colors.main,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.dark,
          },
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.light,
            },
          },

          '.MuiSvgIcon-root': {
            color: colors.main,
          },
        },
      },
    },
  },
  typography: {
    // p: {
    //   color: 'beige',
    // },
    // h1: {
    //   color: 'beige',
    // },
    allVariants: {
      color: colors.main,
    },
  },
  palette: {
    primary: {
      main: colors.main,
      light: colors.light,
      dark: colors.dark,
      contrastText: colors.contrast,
    },
    background: {
      default: '#38302E',
      paper: '#38302E',
    },
  },
});
