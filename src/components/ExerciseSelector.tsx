import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Button, Card, styled } from '@mui/material';
import { Exercise, useFetchExercisesQuery } from '../services/sport.service';
import GenericModal from './GenericModal';
import { SessionExercise } from '../slices/sessionSlice';

export interface IProps {
  sportId: number;
  selectedExercises: Exercise[];
  setSelectedExercises: (exercises: Exercise[]) => void;
}

const ExerciseSelectorComponent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
}));

// const StyledCard = styled(Card)(() => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: 10,
//   border: '1px solid black',
//   borderRadius: 20,
//   backgroundColor: 'beige',
//   '&:hover': {
//     backgroundColor: 'red',
//   },
// }));

const ExerciseSelector: React.FC<IProps> = ({
  sportId,
  selectedExercises,
  setSelectedExercises,
}) => {
  const { data: exercisesList } = useFetchExercisesQuery(sportId);
  const [exercisesChoiceList, setExercisesChoiceList] = useState<Exercise[]>([]);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  useEffect(() => {
    buildExercisesList();
  }, [selectedExercises, sportId, exercisesList]);

  const buildExercisesList = () => {
    const choiceList: Exercise[] = [];
    exercisesList?.forEach((exercise: Exercise) => {
      if (!selectedExercises.find((ex) => ex.id === exercise.id)) {
        choiceList.push(exercise);
      }
    });
    if (!choiceList.length) {
      setIsExerciseModalOpen(false);
    }
    console.log('choiceList', choiceList);
    setExercisesChoiceList(choiceList);
  };

  const addSelectedExercise = (exercise: Exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  return (
    <>
      {exercisesChoiceList.length ? (
        <Button onClick={() => setIsExerciseModalOpen(true)}>Add an exercise</Button>
      ) : null}
      <GenericModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
      >
        <p>Choose an exercise</p>
        <Box>
          {exercisesChoiceList.map((ex) => (
            <Button
              key={ex.id}
              onClick={() => addSelectedExercise(ex)}
            >
              {ex.name}
            </Button>
          ))}
        </Box>
      </GenericModal>
    </>
  );
};

export default ExerciseSelector;
