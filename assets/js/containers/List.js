import { connect } from 'react-redux';
import ListRecipes from '../components/ListRecipes';

const mapStateToProps = (state, ownProps) => {
  return {
    recipes: state.recipes
  }
}

const List = connect(
  mapStateToProps,
  null
)(ListRecipes)


export default List;