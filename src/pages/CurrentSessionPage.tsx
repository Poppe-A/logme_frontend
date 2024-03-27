import { Box, Container, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Exercise, useFetchExercisesQuery, useFetchSportsQuery } from '../services/sport.service';
import { SessionOptions } from './NewSessionPage';
import PageWrapper from '../components/PageWrapper';
import { useAppDispatch } from '../store';
import {
  createNewSession,
  selectCurrentSession,
  selectIsSessionLoading,
  Session,
  SessionExercise,
} from '../slices/sessionSlice';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import ExerciseSelector from '../components/ExerciseSelector';
import SessionExerciseDetail from '../components/SessionExerciseDetail';
export interface LocationParams {
  pathname: string;
  state: SessionOptions;
  search: string;
  hash: string;
  key: string;
}

/////////////////////
// STYLED COMPONENT
/////////////////////

type ExerciseTileProps = {
  isSelected?: boolean;
};

const ExerciseContainer = styled(Container)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 4fr',
}));

const ExerciseList = styled(Box)(() => ({
  backgroundColor: 'grey',
  maxHeight: 300,
  overflow: 'scroll',
}));

const ExerciseTile = styled(Container, {
  shouldForwardProp: (propName) => propName !== 'isSelected',
})<ExerciseTileProps>((props) => ({
  padding: 30,
  backgroundColor: props.isSelected ? 'beige' : 'grey',
  borderBottom: 'solid white 1px',
}));

// TODO : il faut r&ésoudre le bordel entre exercises et sessionExercise
function CurrentSessionPage() {
  const dispatch = useAppDispatch();
  const isSessionLoading = useSelector(selectIsSessionLoading);
  const currentSession = useSelector(selectCurrentSession) as Session;

  const { data: sportsList } = useFetchSportsQuery();
  // const { data: allAvailableExercises } = useFetchExercisesQuery(sportId);
  const [exercisesList, setExerciseList] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  useEffect(() => {
    console.log('currentsessionsss', currentSession);
    if (currentSession?.exercises) {
      buildExerciseList(currentSession.exercises);
    }
  }, [currentSession?.id]);

  const buildExerciseList = (exercises: SessionExercise[]) => {
    const list = [...exercises].map((ex) => {
      return {
        id: ex.id,
        name: ex.name,
        description: ex.description,
      };
    });

    setExerciseList(list);
    setSelectedExercise(list[0]);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <PageWrapper>
      <h1>
        Current Session -
        {` ${new Date(currentSession?.createdAt as Date).toLocaleDateString()} - ${
          sportsList?.find((sport) => sport.id === currentSession?.sportId)?.name
        }`}
      </h1>
      {isSessionLoading && <CircularProgress />}
      {!currentSession ? (
        <Container>Problem with session</Container>
      ) : (
        <ExerciseContainer>
          <ExerciseList>
            {exercisesList.map((ex: Exercise) => (
              <ExerciseTile
                isSelected={ex.id === selectedExercise?.id}
                onClick={() => setSelectedExercise(ex)}
                key={ex.id}
              >
                {ex.name}
              </ExerciseTile>
            ))}
            <ExerciseTile>
              <ExerciseSelector
                selectedExercises={exercisesList}
                setSelectedExercises={setExerciseList}
                sportId={currentSession?.sportId}
              />
            </ExerciseTile>
          </ExerciseList>

          <SessionExerciseDetail
            sessionId={currentSession.id}
            selectedExercise={selectedExercise || null}
            sessionExerciseDetails={currentSession.exercises.find(
              (ex) => ex.id === selectedExercise?.id
            )}
          />
        </ExerciseContainer>
      )}
    </PageWrapper>
  );
}

export default CurrentSessionPage;
