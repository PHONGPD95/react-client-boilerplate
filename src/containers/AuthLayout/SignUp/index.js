import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';

import { Button, TextField, Typography } from '@material-ui/core';

import { SIGN_UP_REQUESTED } from '~actions/authAction';

function SignUp() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [values, setValues] = useState({});

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    trackPromise(dispatch({ type: SIGN_UP_REQUESTED, payload: values })).then(() => {
      toast.success('Sign up successful!');

      history.push('/sign-in');
    });
  };

  return (
    <div className="auth-form">
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          variant="outlined"
          label="Username"
          autoComplete="username"
          margin="normal"
          required
          fullWidth
          autoFocus
          onChange={handleChange('username')}
        />

        <TextField
          id="email"
          name="email"
          variant="outlined"
          label="Email Address"
          autoComplete="email"
          margin="normal"
          required
          fullWidth
          onChange={handleChange('email')}
        />

        <TextField
          id="password"
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          required
          fullWidth
          onChange={handleChange('password')}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>

        <Typography component="p">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </Typography>
      </form>
    </div>
  );
}

export default SignUp;
