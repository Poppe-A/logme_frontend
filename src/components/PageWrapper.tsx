import React, { ReactNode } from 'react';
import { Button, Container, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export interface IProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40,
}));

const Header = styled(Container)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const PageWrapper: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  console.log('pathname', pathname);
  return (
    <StyledContainer>
      {pathname !== '/' && (
        <Header>
          <Button onClick={() => navigate('/', { replace: true })}>Home</Button>
        </Header>
      )}

      {children}
    </StyledContainer>
  );
};

export default PageWrapper;
