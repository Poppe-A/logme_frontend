import { Box, Container, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Exercise, useFetchExercisesQuery, useFetchSportsQuery } from '../services/sport.service';
import { SessionOptions } from './NewSessionPage';
import PageWrapper from '../components/PageWrapper';
import { useAppDispatch } from '../store';
import { createNewSession } from '../slices/sessionSlice';

export interface LocationParams {
  pathname: string;
  state: SessionOptions;
  search: string;
  hash: string;
  key: string;
}

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

const ExerciseDetails = styled(Container)(() => ({
  backgroundColor: 'beige',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
}));

function CurrentSessionPage() {
  const dispatch = useAppDispatch();
  const { sportId, template, customExercises, name } = useLocation().state
    .sessionOptions as SessionOptions;
  const { data: sportsList } = useFetchSportsQuery();
  // const { data: allAvailableExercises } = useFetchExercisesQuery(sportId);
  const [exercisesList, setExerciseList] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  useEffect(() => {
    dispatch(createNewSession({ sportId, name }));
  }, []);

  useEffect(() => {
    if (template === 'custom' && customExercises) {
      setExerciseList(customExercises);
      setSelectedExercise(customExercises[0]);
    } else {
      getExerciseFromTemplate();
    }
  }, []);

  const getExerciseFromTemplate = () => {
    // TODO
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
        {`${new Date()} - ${sportsList?.find((sport) => sport.id === sportId)?.name}`}
      </h1>
      <ExerciseContainer>
        <ExerciseList>
          {exercisesList.map((ex: Exercise) => (
            <ExerciseTile
              isSelected={ex.id === selectedExercise?.id}
              onClick={() => setSelectedExercise(ex)}
            >
              {ex.name}
            </ExerciseTile>
          ))}
          <ExerciseTile>Add an exercise</ExerciseTile>
        </ExerciseList>
        <ExerciseDetails>
          <p>{selectedExercise?.name}</p>
          <p>{selectedExercise?.description}</p>
          <form></form>
        </ExerciseDetails>
      </ExerciseContainer>
    </PageWrapper>
  );
}

export default CurrentSessionPage;
