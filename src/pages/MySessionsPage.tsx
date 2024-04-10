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
    gap: '10px',
  }));

  return (
    <PageWrapper>
      <SessionContainer>
        {sessions &&
          sessions.map((session) => (
            <SessionAccordion key={session.id}>
              {/* <AccordionSummary>
              {`${session.name} - ${session.sportName} - ${new Date(
                session.createdAt as Date
              ).toLocaleDateString()}`}
             
            </AccordionSummary> */}
              <AccordionSummary>
                <AccordionSummaryContainer>
                  <p>{session.name}</p>
                  <p>{session.sportName}</p>
                  <p>{new Date(session.createdAt as Date).toLocaleDateString()}</p>
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
