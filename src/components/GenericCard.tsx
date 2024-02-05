import React, { ReactNode, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Box, Button, Card, Modal, styled } from '@mui/material';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useFetchSportsQuery } from '../services/sport.service';

export interface IProps {
  onClick?: () => void;
  children: ReactNode;
}

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

const GenericCard: React.FC<IProps> = ({ children, onClick }) => (
  <StyledCard
    className="genericCard"
    elevation={4}
    onClick={onClick}
  >
    {children}
  </StyledCard>
);

export default GenericCard;
