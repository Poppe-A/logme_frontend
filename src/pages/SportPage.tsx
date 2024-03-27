import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { Box, Button, CircularProgress, Container } from '@mui/material';
import { useFetchSportsQuery } from '../services/sport.service';

const SportPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchSportsQuery();

  return (
    <>
      <h1>All Sports</h1>
      <Button onClick={() => navigate('/')}>Back</Button>

      {isLoading && <CircularProgress />}
      <Box>
        {data && data.length
          ? data.map((sport) => (
              <Button
                key={sport.id}
                onClick={() => {
                  console.log(sport);
                  navigate(sport.id.toString());
                }}
              >
                {sport.name}
              </Button>
            ))
          : null}
      </Box>
    </>
  );
};

export default SportPage;
