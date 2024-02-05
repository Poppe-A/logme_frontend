import React, { ReactNode } from 'react';
import { Box, Card, styled } from '@mui/material';

// useless, need to implement
export interface IProps {
  onClick?: () => void;
  children: ReactNode;
}

const ExerciseSelectorComponent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  border: '1px solid black',
  borderRadius: 20,
  backgroundColor: 'beige',
  '&:hover': {
    backgroundColor: 'red',
  },
}));

const ExerciseSelector: React.FC<IProps> = ({ children, onClick }) => (
  <ExerciseSelectorComponent></ExerciseSelectorComponent>
);

export default ExerciseSelector;
