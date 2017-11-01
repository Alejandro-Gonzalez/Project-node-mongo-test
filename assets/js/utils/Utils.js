class _Utils {
  fieldForm(form, classNameType = null){
    let formFields = [...form.elements];
    if(classNameType !== null)
      formFields = formFields.filter(field => field.className.includes(classNameType));
    return formFields;
  }
  isValid(fields){
    let all = fields.filter(field => field.value !== '');
    fields = fields.filter(field => field.dataset.validate === "true" && field.value === "");
    let isValid = { isValid: !Boolean(fields.length), fields };
    
    if(!all.length)
      isValid.isValid = false;
    return isValid;
  }
  formData(fields){

    const getOptions = options => {
      return options.reduce((acum, opt) => {
        if(opt.selected)
          acum.push(opt.value);
        return acum;
      },[]);
    };

    return fields.reduce((acum, field) => {
      if (field.tagName == "SELECT" && field.multiple) {
        acum[field.name] = getOptions([...field.options]);
      }else{
        acum[field.name] = field.value;
      }
      return acum
    }, {});
  }
}
const Utils = new _Utils()
export default Utils;
