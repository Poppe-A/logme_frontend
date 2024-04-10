import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, styled, Menu, MenuItem } from '@mui/material';
import { Serie, deleteSeries, updateSerie } from '../slices/sessionSlice';
import { Edit, Check } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../store';

export interface IProps {
  serie: Serie;
  isOpen?: boolean;
}

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledBox = styled(Box)(() => ({
  width: '150px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
  padding: 10,
  borderRadius: '10px',
  // backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
}));

const SerieDetails: React.FC<IProps> = ({ serie, isOpen }) => {
  const [isEditing, setIsEditing] = useState(isOpen ?? false);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   if(isOpen) {
  //     setIsEditing()
  //   }
  // }, [])

  type FormValues = {
    repNumber: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('isDirty', isDirty);
    if (isDirty) {
      const updatedSerie = {
        id: serie.id,
        value: parseInt(data.repNumber),
        sessionId: serie.sessionId,
      };
      dispatch(updateSerie(updatedSerie));
    }

    setIsEditing(false);
  };

  const deleteSerie = () => {
    console.log('delete');
    dispatch(deleteSeries([serie.id]));
    handleMenuClose();
  };

  return (
    <>
      {!isEditing ? (
        <StyledBox>
          <p>{serie.value} reps</p>
          <Button
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleMenuClick}
          >
            ...
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setIsEditing(true);
              }}
            >
              {/* <Edit /> */}
              Edit
            </MenuItem>
            <MenuItem onClick={() => deleteSerie()}>Delete</MenuItem>
          </Menu>
        </StyledBox>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="repNumber"
            defaultValue={serie.value.toString()}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number"
                style={{ width: '100px' }}
              />
            )}
          />
          <Button type="submit">
            <Check
              onClick={() => setIsEditing(true)}
              sx={{ cursor: 'pointer', color: 'black' }}
            />
          </Button>
        </form>
      )}
    </>
  );
};

export default SerieDetails;
