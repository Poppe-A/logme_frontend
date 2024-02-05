import React, { ReactNode } from 'react';
import { Container, styled } from '@mui/material';

export interface IProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'start',
  gap: 20,
}));

const RowCenteredContainer: React.FC<IProps> = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default RowCenteredContainer;
