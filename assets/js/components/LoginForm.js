import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput, CustomSelect} from './CustomElements/CustomInput.js';


const required = value => {
  if(value == "" || value == undefined)
    value = ""
  return value.length  ? undefined : 'Este campo es requerido'
};

const Login = props => {
  const {handleSubmit, pristine, submitting, ingredients, restrictions} = props;
  return (
    <form onSubmit={handleSubmit}>
      <h3>INICIAR SESION</h3>
      <Field 
        label="email"
        name="email"
        component={SimpleInput}
        type="email"
        validate={[required]}
      />
      <Field 
        label="contraseña"
        name="password"
        component={SimpleInput}
        type="password"
        validate={[required]}
      />
      <button type="submit" disabled={submitting}>ENVIAR</button>
    </form>
  )
}

export default reduxForm({
  form: 'Login'
})(Login)