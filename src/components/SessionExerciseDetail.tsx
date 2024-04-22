import React, { useEffect } from 'react';
import { Box, Button, Container, Divider, styled } from '@mui/material';
import { Exercise } from '../services/sport.service';
import {
  SessionExercise,
  createSerie,
  getLastSeries,
  lastSeriesFromExercise,
} from '../slices/sessionSlice';
import SerieDetails from './SerieDetails';
import { useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { SecondaryParagraph, SimpleParagraph } from './Ui/SimpleParagraph';

export interface IProps {
  // selectedExercise: Exercise | null; //TODO probably not needed
  sessionId: number;
  sessionExerciseDetails: SessionExercise | undefined;
}

const ExerciseDetailsContainer = styled(Container)(() => ({
  width: '100',
  backgroundColor: 'beige',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
  gap: 50,
}));

const ExerciseHeader = styled(Container)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: '60px',
}));

const ImagePlaceholder = styled(Box)(() => ({
  width: '150px',
  height: '200px',
  display: 'flex',
  backgroundColor: 'black',
}));

const GlobalSeriesContainer = styled(Container)(() => ({
  backgroundColor: 'beige',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

const SerieListContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  gap: 10,
}));

const SessionExerciseDetail: React.FC<IProps> = ({ sessionId, sessionExerciseDetails }) => {
  const dispatch = useAppDispatch();
  const lastSeries = useSelector(lastSeriesFromExercise);

  useEffect(() => {
    if (sessionExerciseDetails) {
      dispatch(getLastSeries(sessionExerciseDetails.id));
    }
  }, [sessionExerciseDetails]);

  const createNewSerie = () => {
    if (sessionExerciseDetails) {
      dispatch(
        createSerie({
          sessionId: sessionId,
          exerciseId: sessionExerciseDetails.id,
        })
      );
    }
  };

  return (
    <ExerciseDetailsContainer>
      {!sessionExerciseDetails && <h3>No exercise selected</h3>}
      {sessionExerciseDetails && (
        <>
          <ExerciseHeader>
            <Box>
              <h2>{sessionExerciseDetails.name}</h2>
              <h3>{sessionExerciseDetails.description}</h3>
            </Box>
            {/* replace with real image */}
            <ImagePlaceholder />
          </ExerciseHeader>

          <GlobalSeriesContainer>
            {lastSeries?.length > 0 && (
              <>
                <SerieListContainer>
                  <h2>Last session series :</h2>
                  {lastSeries.map((serie) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="10px"
                      marginBottom="20px"
                      key={serie.id}
                    >
                      <SimpleParagraph>{serie.value}</SimpleParagraph>
                      {serie.comment && <SecondaryParagraph>{serie.comment}</SecondaryParagraph>}
                    </Box>
                  ))}
                </SerieListContainer>
                <Divider
                  orientation="vertical"
                  flexItem
                />
              </>
            )}
            <SerieListContainer>
              <h2>My Series :</h2>
              {sessionExerciseDetails?.series.map((serie) => (
                <SerieDetails
                  serie={serie}
                  key={serie.id}
                  isOpen={
                    serie.value === 0 &&
                    sessionExerciseDetails.series[sessionExerciseDetails.series.length - 1].id ===
                      serie.id
                  }
                />
              ))}
              <Button onClick={createNewSerie}>New serie</Button>
            </SerieListContainer>
          </GlobalSeriesContainer>
        </>
      )}
    </ExerciseDetailsContainer>
  );
};

export default SessionExerciseDetail;
