import { useNavigate } from 'react-router-dom';
import {
  Box,
  BoxProps,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Exercise, Sport, useFetchSportsQuery } from '../services/sport.service';
import PageWrapper from '../components/PageWrapper';
import styled from '@emotion/styled';
import RowCenteredContainer from '../components/RowCenteredContainer';
import Dumbell from '../images/dumbbell.svg';
import { useAppDispatch } from '../store';
import { chooseSession, createNewSession, selectCurrentSession } from '../slices/sessionSlice';
import ExerciseSelector from '../components/ExerciseSelector';
import { useSelector } from 'react-redux';
// TODO : load templates, put them in select

const PrepareSessionContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 20,
}));

const ExercisesContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
}));

export type SessionOptions = {
  template: string;
  customExercises?: Exercise[];
};

type StartButtonProps = {
  isDisabled: boolean;
};

// Only way to avoid react error in console (React does not recognize ...)
const StartButton = styled(Box, { shouldForwardProp: (propName) => propName !== 'isDisabled' })<
  StartButtonProps & BoxProps
>((props) => ({
  width: 100,
  height: 100,
  borderRadius: 100,
  border: '1px solid black',
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  rotate: '45deg',
  position: 'absolute',
  bottom: 50,
  right: 50,
  backgroundColor: props.isDisabled ? 'grey' : 'white',
  '&:hover': {
    backgroundColor: props.isDisabled ? 'grey' : 'green',
  },
  cursor: props.isDisabled ? '' : 'pointer',
}));

const NewSessionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentSession = useSelector(selectCurrentSession);

  const [sessionChoice, setSessionChoice] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedExerciseList, setSelectedExerciseList] = useState<Exercise[]>([]);
  const [sessionName, setSessionName] = useState('');
  const { data: sportsList } = useFetchSportsQuery();

  // useEffect(() => {
  //   dispatch(chooseSession(1));
  // }, []);

  const startSession = () => {
    console.log('start session');
    const sessionOptions: SessionOptions = {
      template: sessionChoice,
    };
    if (sessionChoice === 'custom') {
      sessionOptions.customExercises = selectedExerciseList;
    }

    dispatch(
      createNewSession({ sportId: parseInt(selectedSport), name: sessionName, sessionOptions })
    );

    navigate('/currentSession', { state: { sessionOptions } });
  };

  const handleTemplateChange = (value: string) => {
    setSessionChoice(value);
  };

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
    setSelectedExerciseList([]);
  };

  const removeSelectedExercise = (exercise: Exercise) => {
    const index = selectedExerciseList.findIndex((ex) => ex.id === exercise.id);

    const exercises = [...selectedExerciseList];
    exercises.splice(index, 1);
    setSelectedExerciseList(exercises);
  };

  const renderAddExerciseButton = (onClick: () => void) => {
    return <Button onClick={onClick}>Add an exercise</Button>;
  };

  return (
    <PageWrapper>
      <h1>Welcome to this new session</h1>
      <PrepareSessionContainer>
        <Box>
          <p>Let's prepare the session :</p>
          <p>
            You can either choose one of your session template (or create a new one) or define a
            custom session. You can still add exercises during your session.
          </p>
          <p></p>
        </Box>
        <TextField
          label="session name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
        <RowCenteredContainer>
          <FormControl>
            <InputLabel id="sessionChoice">Type of Session</InputLabel>
            <Select
              value={sessionChoice}
              onChange={(event) => handleTemplateChange(event.target.value)}
              label="sessionChoice"
              labelId="sessionChoice"
              placeholder="Select a template"
              sx={{ width: 200 }}
            >
              <MenuItem value={'custom'}>Custom</MenuItem>
              <MenuItem value={'1'}>Template 1</MenuItem>
              <MenuItem value={'2'}>Template 2</MenuItem>
            </Select>
          </FormControl>
          <Button>Create a template</Button>
        </RowCenteredContainer>

        {sessionChoice === 'custom' && (
          <RowCenteredContainer>
            <FormControl>
              <InputLabel id="sportSelection">Sport</InputLabel>
              <Select
                label="Sport"
                labelId="sportSelection"
                value={selectedSport}
                defaultValue={''}
                onChange={(e) => handleSportChange(e.target.value)}
                sx={{ width: 200 }}
              >
                {sportsList?.map((sport: Sport) => (
                  <MenuItem
                    value={sport.id.toString()}
                    key={sport.id}
                  >
                    {sport.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedSport && (
              <ExercisesContainer>
                {selectedExerciseList &&
                  selectedExerciseList.map((exercise) => (
                    <Box
                      key={exercise.id}
                      display="flex"
                      flexDirection="row"
                    >
                      <p>{exercise.name}</p>
                      <Button onClick={() => removeSelectedExercise(exercise)}>X</Button>
                    </Box>
                  ))}
                <ExerciseSelector
                  sportId={parseInt(selectedSport)}
                  selectedExercises={selectedExerciseList}
                  addExercise={(ex: Exercise) => {
                    setSelectedExerciseList([...selectedExerciseList, ex]);
                  }}
                  componentRenderer={renderAddExerciseButton}
                />
              </ExercisesContainer>
            )}
          </RowCenteredContainer>
        )}
        <StartButton
          isDisabled={!sessionChoice}
          onClick={() => (sessionChoice ? startSession() : null)}
        >
          <img
            src={Dumbell}
            width={70}
          />
        </StartButton>
      </PrepareSessionContainer>
    </PageWrapper>
  );
};

export default NewSessionPage;
