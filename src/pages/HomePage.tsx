import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GenericCard from '../components/GenericCard';
import PageWrapper from '../components/PageWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSession } from '../slices/sessionSlice';

function HomePage() {
  const navigate = useNavigate();
  const currentSession = useSelector(selectCurrentSession);

  return (
    <PageWrapper>
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
        {currentSession && (
          <GenericCard onClick={() => navigate('/currentSession', { replace: true })}>
            <h2>Current session</h2>
          </GenericCard>
        )}
        <GenericCard onClick={() => navigate('/sport', { replace: true })}>
          <h2>All Sports</h2>
        </GenericCard>
        <GenericCard>
          <h2>My Profile</h2>
        </GenericCard>
      </Box>
    </PageWrapper>
  );
}

export default HomePage;
