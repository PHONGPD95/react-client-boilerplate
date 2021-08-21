import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { Button, TextField, Typography } from '@material-ui/core';

import { SIGN_IN_REQUESTED } from '~actions/authAction';

function SignIn() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [values, setValues] = useState({});

  const from = location.state || { from: { pathname: '/' } };

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    trackPromise(dispatch({ type: SIGN_IN_REQUESTED, payload: values }));
  };

  if (isAuthenticated) return <Redirect to={from} />;

  return (
    <div className="auth-form">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          variant="outlined"
          label="Email Address"
          margin="normal"
          required
          fullWidth
          autoFocus
          onChange={handleChange('email')}
        />

        <TextField
          id="password"
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          margin="normal"
          required
          fullWidth
          onChange={handleChange('password')}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>

        <Typography component="p">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </Typography>
      </form>
    </div>
  );
}

export default SignIn;
