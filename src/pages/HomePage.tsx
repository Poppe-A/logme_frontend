import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Box, Button } from '@mui/material';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import GenericCard from '../components/GenericCard';
import PageWrapper from '../components/PageWrapper';

function HomePage() {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/', { replace: true });
  };

  return (
    <PageWrapper>
      <h1>Hello {user?.username} !</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={10}
        width="70%"
      >
        <GenericCard onClick={() => navigate('/newSession', { replace: true })}>
          <h2>New Session</h2>
        </GenericCard>
        <GenericCard onClick={() => navigate('/mySessions', { replace: true })}>
          <h2>My sessions</h2>
        </GenericCard>
        <GenericCard onClick={() => navigate('/sport', { replace: true })}>
          <h2>All Sports</h2>
        </GenericCard>
        <GenericCard>
          <h2>My Profile</h2>
        </GenericCard>
      </Box>

      <Button onClick={handleLogout}>Logout</Button>

      <Button onClick={handleLogout}>New session</Button>
      <Button onClick={handleLogout}>See my sessions</Button>
      <Button onClick={() => navigate('/sport', { replace: true })}>See all sport</Button>
    </PageWrapper>
  );
}

export default HomePage;
