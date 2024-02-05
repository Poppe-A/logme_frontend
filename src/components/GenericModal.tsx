import React, { ReactNode } from 'react';
import { Box, Modal, styled } from '@mui/material';

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledBox = styled(Box)(() => ({
  backgroundColor: 'white',
  padding: 10,
}));

const GenericModal: React.FC<IProps> = ({ children, isOpen, onClose }) => (
  <StyledModal
    open={isOpen}
    onClose={onClose}
  >
    <StyledBox>{children}</StyledBox>
  </StyledModal>
);

export default GenericModal;
