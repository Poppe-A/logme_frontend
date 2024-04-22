import { Button, Container, TextField, styled } from '@mui/material';
import { theme } from './theme';
import { colors } from './customColors';

export function Prout() {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%', // Full width
      }}
    ></Container>
  );
}

export const FullSizeContainer = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledTextField = styled(TextField)(() => ({
  input: {
    color: 'beige',
  },
}));

export const GenericButton = styled(Button)(() => ({
  input: {
    color: 'beige',
  },
}));

// export const GenericTextField = styled(TextField)(({ theme }) => ({

// }));
