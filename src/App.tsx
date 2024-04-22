import React from 'react';
import './App.css';
import Routes from './Routes';
import AuthProvider from './provider/AuthProvider';
import { User, UserContext } from './contexts/UserContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Provider>
      </UserContext.Provider>
    </AuthProvider>
  );
}

export default App;
