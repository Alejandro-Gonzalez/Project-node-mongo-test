
import React from 'react';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';

export const SimpleInput = ({input, label,placeholder, type, meta: { touched, error, warning }}) => {
  return (
    <div>
      {
        label ? 
          <label>
            {label}
          </label>
        :
          ""
      }
      <div>
        {
          typeInput({type, input, placeholder})
        }
        {touched &&
          ((error &&
            <span>
              {error}
            </span>) ||
            (warning &&
              <span>
                {warning}
              </span>))}
      </div>
    </div>
  )
};
export const CustomSelect = ({input, label, name, data, meta: { touched, error, warning }}) => {
  return (
    <div>
      {
        label ? 
          <label>
            {label}
          </label>
        :
          ""
      }
      <div>
        <Creatable
          {...input}
          name={name}
          value={input.value}
          options={data}
          multi={true}
          onChange={value => input.onChange(value.map(val => val.value))}
          onBlur={value => input.onBlur([...input.value])}
        />

        {touched &&
          ((error &&
            <span>
              {error}
            </span>) ||
            (warning &&
              <span>
                {warning}
              </span>))}
      </div>
    </div>
  )
};
const typeInput = ({type, input, placeholder}) => {
  let element = null;
  switch(type){
    case "text":
      element = <input {...input} placeholder={placeholder} type={type} />;
      break;
    case "email":
      element = <input {...input} placeholder={placeholder} type={type} />;
      break;
    case "textarea":
      element = <textarea {...input} placeholder={placeholder} />;
      break;
    case "number":
      element = <input {...input} type={type} placeholder={placeholder} />;
      break;
    case "tel":
      element = <input {...input} type={type} placeholder={placeholder} />;
      break;
    case "password":
      element = <input {...input} type={type} placeholder={placeholder} />;
      break;
    default:
      element = <input {...input} type="text" placeholder={placeholder} />;
  }
  return element;
}
