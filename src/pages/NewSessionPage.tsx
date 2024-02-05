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
import {
  Exercise,
  Sport,
  useFetchExercisesQuery,
  useFetchSportsQuery,
} from '../services/sport.service';
import GenericModal from '../components/GenericModal';
import PageWrapper from '../components/PageWrapper';
import styled from '@emotion/styled';
import RowCenteredContainer from '../components/RowCenteredContainer';
import Dumbell from '../images/dumbbell.svg';
// TODO : load templates, put them in select

const PrepareSessionContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 20,
}));

const ExerciseSelector = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
}));

export type SessionOptions = {
  sportId: number;
  template: string;
  name: string;
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
  const [sessionChoice, setSessionChoice] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [exercisesChoiceList, setExerciseChoiceList] = useState<Exercise[]>([]);
  const [sessionName, setSessionName] = useState('');
  const { data: sportsList } = useFetchSportsQuery();
  const { data: exercisesList } = useFetchExercisesQuery(parseInt(selectedSport || '0'));

  useEffect(() => {
    buildExercisesList();
  }, [selectedExercises, selectedSport, exercisesList]);

  const startSession = () => {
    console.log('start session');
    const sessionOptions: SessionOptions = {
      template: sessionChoice,
      sportId: parseInt(selectedSport),
      name: sessionName,
    };
    if (sessionChoice === 'custom') {
      sessionOptions.customExercises = selectedExercises;
    }

    navigate('/currentSession', { state: { sessionOptions } });
  };

  const handleTemplateChange = (value: string) => {
    setSessionChoice(value);
  };

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
    setSelectedExercises([]);
  };

  const addSelectedExercise = (exercise: Exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const removeSelectedExercise = (exercise: Exercise) => {
    const index = selectedExercises.findIndex((ex) => ex.id === exercise.id);

    const exercises = [...selectedExercises];
    exercises.splice(index, 1);
    setSelectedExercises(exercises);
  };

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
    setExerciseChoiceList(choiceList);
  };

  return (
    <PageWrapper>
      <h1>Welcome to this new session</h1>
      <PrepareSessionContainer>
        <Box>
          <p>Let's prepare the session :</p>
          <p>
            You can either choose one of your session template (or create a new one) or define a
            custom session. You can still add exercise during your session.
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
              <ExerciseSelector>
                {selectedExercises &&
                  selectedExercises.map((exercise) => (
                    <Box
                      key={exercise.id}
                      display="flex"
                      flexDirection="row"
                    >
                      <p>{exercise.name}</p>
                      <Button onClick={() => removeSelectedExercise(exercise)}>X</Button>
                    </Box>
                  ))}
                {exercisesChoiceList.length ? (
                  <Button onClick={() => setIsExerciseModalOpen(true)}>Add an exercise</Button>
                ) : null}
              </ExerciseSelector>
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
    </PageWrapper>
  );
};

export default NewSessionPage;
