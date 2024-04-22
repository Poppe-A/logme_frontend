import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  styled,
} from '@mui/material';
import { useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { useAppDispatch } from '../store';
import { chooseSession, fetchUserSessions, selectAllSessions } from '../slices/sessionSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SimpleParagraph } from '../components/Ui/SimpleParagraph';

function MySessionsPage() {
  const sessions = useSelector(selectAllSessions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO : do it on startup, the update when new session or updated session
    dispatch(fetchUserSessions());
  }, []);

  const SessionContainer = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }));

  const SessionAccordion = styled(Accordion)(() => ({
    width: '300px',
  }));

  const AccordionSummaryContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10px',
    paddingBlock: '5px',
  }));

  return (
    <PageWrapper>
      <SessionContainer>
        {sessions &&
          sessions.map((session) => (
            <SessionAccordion key={session.id}>
              <AccordionSummary>
                <AccordionSummaryContainer>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <SimpleParagraph>
                      {session.sportName} -{' '}
                      {new Date(session.createdAt as Date).toLocaleDateString()}
                    </SimpleParagraph>

                    <SimpleParagraph>{session.name}</SimpleParagraph>
                  </Box>
                  {!session.isFinished && (
                    <Button
                      onClick={(ev) => {
                        console.log('zefezf');
                        dispatch(chooseSession(session.id));

                        navigate('/currentSession', { state: {} });
                        ev.stopPropagation();
                      }}
                    >
                      Go
                    </Button>
                  )}
                </AccordionSummaryContainer>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {session.exercises.map((exercise) => {
                    return (
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                        key={exercise.id}
                      >
                        <h2>{exercise.name} - </h2>
                        <Box
                          display="flex"
                          flexDirection="row"
                          gap={1}
                        >
                          {exercise.series.map((serie) => (
                            <h3 key={serie.id}>{` ${serie.value}`}</h3>
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </SessionAccordion>
          ))}
      </SessionContainer>
    </PageWrapper>
  );
}

export default MySessionsPage;
