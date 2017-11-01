import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput, CustomSelect} from './CustomElements/CustomInput.js';
import Register from './RegisterForm';
import Login from './LoginForm';

const Authentication = ({userRegister, userLogin, location}) => {
  const isLogin = location.pathname.includes("login");
  return (
    <div>
      {
        isLogin ?  <Login onSubmit={userLogin}/> : <Register onSubmit={userRegister}/>
      }
    </div> 
  )
} 

export default Authentication;