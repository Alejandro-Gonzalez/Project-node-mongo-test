import React, {Component} from 'react'
import { connect } from 'react-redux';
import {addRecipe, getRestrictions, getIngredients} from '../actions';
import {reset} from 'redux-form';
import FormCreate from '../components/FormCreate';


class Create extends Component{
  componentWillMount() {
    const { getRestrictions, getIngredients} = this.props;
    getIngredients();
    getRestrictions();
  }
  render(){
    const { onSubmit , restrictions, ingredients} = this.props
    return(
      <FormCreate 
        onSubmit={onSubmit}
        restrictions={restrictions}
        ingredients={ingredients}
      />
    )
  }
}
const optionFormated = opts => {
  opts = opts.reduce((acum, opt) => {
    opt = {value: opt.name, label: opt.name};
    acum.push(opt);
    return acum;
  }, []);
  return opts
}

const mapStateToProps = (state, ownProps) => {
  return {
    ingredients: optionFormated(state.ingredients),
    restrictions: optionFormated(state.restrictions)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => {
      dispatch(addRecipe(data))
      dispatch(reset('create'));
    },
    getIngredients: () => {
      dispatch(getIngredients('/api/getAllIngredients'))
    },
    getRestrictions: () => {
      dispatch(getRestrictions('/api/getAllRestrictions'))
    } 
  }
}

const CreateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)

export default CreateForm;