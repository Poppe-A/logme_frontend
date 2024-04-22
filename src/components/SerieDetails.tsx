import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, styled, Menu, MenuItem } from '@mui/material';
import { Serie, deleteSeries, updateSerie } from '../slices/sessionSlice';
import { Edit, Check, Clear } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../store';
import { SecondaryParagraph, SimpleParagraph } from './Ui/SimpleParagraph';

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
  width: '270px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: 10,
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
}));

const SerieDetails: React.FC<IProps> = ({ serie, isOpen }) => {
  const [isEditing, setIsEditing] = useState(isOpen ?? false);
  const dispatch = useAppDispatch();

  // TODO factorie and create menu component
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
    value: string;
    comment: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('dadadada', data, serie);
    console.log('isDirty', isDirty);
    if (isDirty) {
      const updatedSerie = {
        id: serie.id,
        value: parseInt(data.value),
        comment: data.comment,
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <SimpleParagraph>{serie.value} reps</SimpleParagraph>
            <Button
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleMenuClick}
              style={{ color: 'black' }}
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
                Edit
              </MenuItem>
              <MenuItem onClick={() => deleteSerie()}>Delete</MenuItem>
            </Menu>
          </Box>
          {serie.comment && <SecondaryParagraph>{serie.comment}</SecondaryParagraph>}
        </StyledBox>
      ) : (
        <StyledBox>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', marginLeft: 'auto' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="5px"
              marginTop="10px"
            >
              <Controller
                control={control}
                name="value"
                defaultValue={serie.value.toString()}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Value"
                    style={{ width: '150px' }}
                  />
                )}
              />
              <Controller
                control={control}
                name="comment"
                defaultValue={serie.comment ?? ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Comment"
                    style={{ width: '150px' }}
                  />
                )}
              />
            </Box>

            <Button type="submit">
              <Check sx={{ cursor: 'pointer', color: 'black' }} />
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              <Clear sx={{ cursor: 'pointer', color: 'black' }} />
            </Button>
          </form>
        </StyledBox>
      )}
    </>
  );
};

export default SerieDetails;
