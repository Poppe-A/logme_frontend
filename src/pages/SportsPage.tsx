import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import { useAddSportMutation, useFetchSportsQuery } from '../services/sport.service';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Check } from '@mui/icons-material';
import { useAppDispatch } from '../store';

const SportsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useFetchSportsQuery();
  const [addSport] = useAddSportMutation();

  type FormValues = {
    name: string;
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    addSport({ body: data, token: token || null });
    reset();
    setIsFormOpen(false);
  };

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
      {!isFormOpen ? (
        <Button onClick={() => setIsFormOpen(true)}>Add sport</Button>
      ) : (
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
          <Button type="submit">
            <Check sx={{ cursor: 'pointer', color: 'black' }} />
          </Button>
        </form>
      )}
    </>
  );
};

export default SportsPage;
