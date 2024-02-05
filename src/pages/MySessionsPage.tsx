import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PageWrapper from '../components/PageWrapper';
import { useFetchExercisesQuery, useFetchSportsQuery } from '../services/sport.service';
import { useAppDispatch } from '../store';
import { Session, fetchUserSessions, selectAllSessions } from '../slices/sessionSlice';
import { useSelector } from 'react-redux';

function MySessionsPage() {
  const sessions = useSelector(selectAllSessions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserSessions());
  }, []);

  return (
    <PageWrapper>
      {sessions &&
        sessions.map((session) => (
          <Accordion key={session.id}>
            <AccordionSummary>{`${session.name} - ${session.sportName} - ${session.createdAt}`}</AccordionSummary>
            <AccordionDetails>
              <Box>
                {session.exercises.map((exercise) => {
                  return (
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={1}
                    >
                      <h2>{exercise.exerciseName} - </h2>
                      <Box
                        display="flex"
                        flexDirection="row"
                        gap={1}
                      >
                        {exercise.series.map((serie) => (
                          <h3>{` ${serie.value}`}</h3>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
    </PageWrapper>
  );
}

export default MySessionsPage;
