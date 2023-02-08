import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducer = (state, action) => {
    if (action.type === 'INPUT_UPDATE') {
      return { value: action.val, isValid: action.val.includes('@') };
    }

    if (action.type === 'EMAIL_VALID') {
      return { value: state.value, isValid: state.value.includes('@') };
    }

    return { value: '', isValid: false };
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const passwordReducer = (state, action) => {
    if (action.type === 'INPUT_UPDATE') {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }

    if (action.type === 'PASS_VALID') {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }

    return { value: '', isValid: false };
  };

  const [passwordState, dispatchPass] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    setFormIsValid(emailState.isValid && passwordState.isValid);
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({ type: 'INPUT_UPDATE', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPass({ type: 'INPUT_UPDATE', val: event.target.value });
  };

  const validateEmailHandler = () => {
    // one state (formIsValid - depends on another state - emailIsValid
    // this is not a good practice
    // setEmailIsValid(enteredEmail.includes('@'));

    dispatchEmail({ type: 'EMAIL_VALID' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPass({ type: 'PASS_VALID' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
