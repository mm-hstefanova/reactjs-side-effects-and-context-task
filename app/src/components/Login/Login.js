import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const Login = (props) => {
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

  // optimizing the useEffect to check only for the validity of the fields
  const { isValid: emailIsValid } = emailState;
  const { isValid: passIsValid } = passwordState;

  useEffect(() => {
    const indentifier = setTimeout(() => {
      console.log('Check for validity: ');
      setFormIsValid(emailIsValid && passIsValid);
    }, 500);

    return () => {
      clearTimeout(indentifier);
    };
  }, [emailIsValid, passIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({ type: 'INPUT_UPDATE', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPass({ type: 'INPUT_UPDATE', val: event.target.value });
  };

  const validateEmailHandler = () => {
    // one state emailIsValid - depends on another state - enteredEmail
    // this is not a good practice
    // setEmailIsValid(enteredEmail.includes('@'));

    dispatchEmail({ type: 'EMAIL_VALID' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPass({ type: 'PASS_VALID' });
  };

  const context = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
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
