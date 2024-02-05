import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

function SignupPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  
  return (
    <div className="Login">
      <h1>SignupPage</h1>
      <TextField id="outlined-basic" label="User name" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <Button>Log in</Button>
    </div>
  );
}

export default SignupPage;
