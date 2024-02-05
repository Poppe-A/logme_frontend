import { Button, TextField, useControlled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { UserContext } from '../contexts/UserContext';
import { AxiosError } from 'axios';

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
    <div className="Login">
      <h1>Login page</h1>
      <form>
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
        {loginError && <p>{loginError}</p>}

        <Button onClick={handleSubmit(handleLogin)}>Log in</Button>
      </form>
    </div>
  );
}

export default LoginPage;
