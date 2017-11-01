import { connect } from 'react-redux';
import {authRegister, authLogin} from '../actions';
import Home from '../components/Home';

const mapStateToProps = (state, ownProps) => {
  return {
    recipes: state.recipes,
    location: ownProps.location
  }
}
const HomeContent = connect(
  mapStateToProps,
  null
)(Home)


export default HomeContent;
