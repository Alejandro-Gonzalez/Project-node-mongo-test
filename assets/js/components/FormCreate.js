import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput, CustomSelect} from './CustomElements/CustomInput.js';

const required = value => {
  if(value == "" || value == undefined)
    value = ""
  return value.length  ? undefined : 'Este campo es requerido'
};

const FormCreate = props => {
  const {handleSubmit, pristine, submitting, ingredients, restrictions} = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field 
        label="name"
        name="name"
        component={SimpleInput}
        type="text"
        validate={[required]}
      />
      <Field 
        label="detalle"
        name="detail"
        component={SimpleInput}
        type="textarea"
        validate={[required]}
      />
      <Field 
        label="ingredientes"
        name="ingredients"
        component={CustomSelect}
        validate={[required]}
        data={ingredients}
      />
      <Field 
        label="Restricciones"
        name="restrictions"
        component={CustomSelect}
        validate={[required]}
        data={restrictions}
      />
      <button type="submit" disabled={submitting}>ENVIAR</button>
    </form>
  )
}

export default reduxForm({
  form: 'create' // a unique identifier for this form
})(FormCreate)