import { Button, Container, TextField, Typography, styled, useControlled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { UserContext } from '../contexts/UserContext';
import { AxiosError } from 'axios';
import { colors } from '../theme/customColors';
import { FullSizeContainer, StyledTextField } from '../theme/basicComponent';

export const LoginPageContainer = styled(FullSizeContainer)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.backgroundBase,
}));

export const LoginForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  // justifySelf: 'center',
  // placeSelf: 'center',
  // alignSelf: 'center',
  marginTop: '200px',
}));

type FormData = {
  username: string;
  password: string;
};

function LoginPage() {
  const [loginError, setLogginError] = useState('');
  console.log();
  useEffect(() => {});
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { setToken } = useAuth();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: FormData) => {
    setLogginError('');
    try {
      const loggedUser = await login(username, password);

      console.log('chouetos', loggedUser);
      if (loggedUser?.access_token) {
        setToken(loggedUser.access_token);
        setUser(loggedUser.user);
        navigate('/', { replace: true });
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setLogginError(e.response?.data?.message || 'Problem on login');
      }
    }
  };

  return (
    <FullSizeContainer>
      <Typography variant="h1">Logme App</Typography>
      <LoginForm>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="username-input"
              label="User name"
              variant="outlined"
              onChange={onChange}
              value={value}
              color="primary"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="password-input"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="off"
              onChange={onChange}
              value={value}
            />
          )}
        />
        {loginError && <Typography color="primary.contrastText">{loginError}</Typography>}

        <Button
          variant="outlined"
          onClick={handleSubmit(handleLogin)}
        >
          Log in
        </Button>
      </LoginForm>
    </FullSizeContainer>
  );
}

export default LoginPage;
