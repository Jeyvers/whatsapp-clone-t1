import { Button } from '@material-ui/core';
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import '../css/Login.css';

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    //   From result, idToken is your API key, uid is userid. Other information like email, display name, phone url, image ,etc can be efficiently used to build out your application.
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png'
          alt=''
        />
        <div className='login-text'>
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
