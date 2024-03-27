import React, { useEffect } from 'react';
import { Container, Divider, styled } from '@mui/material';
import { Exercise } from '../services/sport.service';
import { SessionExercise } from '../slices/sessionSlice';

export interface IProps {
  selectedExercise: Exercise | null;
  sessionId: number;
  sessionExerciseDetails: SessionExercise | undefined;
}

const StyledContainer = styled(Container)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40,
}));

const ExerciseDetailsContainer = styled(Container)(() => ({
  backgroundColor: 'beige',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
}));

const SessionExerciseDetail: React.FC<IProps> = ({
  selectedExercise,
  sessionId,
  sessionExerciseDetails,
}) => {
  // useEffect(() => {
  //   console.log('select', selectedExercise);
  // }, []);
  return (
    <ExerciseDetailsContainer>
      {!selectedExercise && <h3>No exercise selected</h3>}
      {selectedExercise && (
        <>
          <StyledContainer>
            <h3>{selectedExercise.name}</h3>
            <h3>{selectedExercise.description}</h3>
          </StyledContainer>
          <Divider />
          {sessionExerciseDetails?.series.map((serie) => (
            <h4>{serie.value}</h4>
          ))}
        </>
      )}
    </ExerciseDetailsContainer>
  );
};

export default SessionExerciseDetail;
