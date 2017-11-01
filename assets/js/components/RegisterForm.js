import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput, CustomSelect} from './CustomElements/CustomInput.js';

const required = value => {
  if(value == "" || value == undefined)
    value = ""
  return value.length  ? undefined : 'Este campo es requerido'
};

const Register = props => {
  const {handleSubmit, pristine, submitting, ingredients, restrictions} = props;
  return (
    <form onSubmit={handleSubmit}>
      <h3>REGISTRATE</h3>
      <Field 
        label="Nombre"
        name="name"
        component={SimpleInput}
        type="text"
        validate={[required]}
      />
      <Field 
        label="email"
        name="email"
        component={SimpleInput}
        type="text"
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
  form: 'Register'
})(Register)