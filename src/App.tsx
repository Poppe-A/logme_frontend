import React from 'react';
import './App.css';
import Routes from './Routes';
import AuthProvider from './provider/AuthProvider';
import { User, UserContext } from './contexts/UserContext';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthProvider>
      <UserContext.Provider value={{user, setUser}} >
        <Provider store={store}>
          <Routes />
        </Provider>
      </UserContext.Provider>
    </AuthProvider>
  );
}

export default App;
