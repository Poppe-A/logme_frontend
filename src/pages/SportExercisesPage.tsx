import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { Button, CircularProgress, Modal } from '@mui/material';
import { Exercise, useFetchExercisesQuery, useFetchSportsQuery } from '../services/sport.service';
import { useState } from 'react';
import GenericModal from '../components/GenericModal';

type ExerciseParams = {
  id: string;
};

const SportExercisesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<ExerciseParams>();

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { data, error, isLoading } = useFetchExercisesQuery(parseInt(id as string));
  const { data: sportData } = useFetchSportsQuery();

  const sport = sportData?.find((sport) => sport.id === parseInt(id as string));

  return (
    <>
      <h1>All exercises {sport?.name}</h1>
      <Button onClick={() => navigate(-1)}>Back</Button>
      {isLoading && <CircularProgress />}
      {data &&
        data.length &&
        data.map((exercise) => (
          <Button
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
          >
            {exercise.name}
          </Button>
        ))}
      <GenericModal
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
      >
        <>
          <h1>{selectedExercise?.name}</h1>
          <h2>{selectedExercise?.description}</h2>
        </>
      </GenericModal>
    </>
  );
};

export default SportExercisesPage;
