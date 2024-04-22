import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Modal, TextField } from '@mui/material';
import {
  Exercise,
  useAddExerciseMutation,
  useFetchExercisesQuery,
  useFetchSportsQuery,
} from '../services/sport.service';
import { useState } from 'react';
import GenericModal from '../components/GenericModal';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../provider/AuthProvider';

type ExerciseParams = {
  id: string;
};

const SportExercisesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<ExerciseParams>();
  const { token } = useAuth();

  const { data, error, isLoading } = useFetchExercisesQuery(parseInt(id as string));
  const { data: sportData } = useFetchSportsQuery();
  const [addExercise] = useAddExerciseMutation();

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sport = sportData?.find((sport) => sport.id === parseInt(id as string));

  type FormValues = {
    name: string;
    description: string;
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    addExercise({ body: { ...data, sportId: sport?.id }, token });
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>All exercises {sport?.name}</h1>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button onClick={() => setIsModalOpen(true)}>Add exercise</Button>

      {isLoading && <CircularProgress />}
      {data && data.length
        ? data.map((exercise) => (
            <Button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
            >
              {exercise.name}
            </Button>
          ))
        : null}
      {/* exercise modal TODO implement update */}
      <GenericModal
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
      >
        <>
          <h1>{selectedExercise?.name}</h1>
          <h2>{selectedExercise?.description}</h2>
        </>
      </GenericModal>
      {/* Create exercise modal */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                style={{ width: '150px' }}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                style={{ width: '150px' }}
              />
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </GenericModal>
    </>
  );
};

export default SportExercisesPage;
