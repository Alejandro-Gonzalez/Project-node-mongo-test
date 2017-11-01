import { connect } from 'react-redux';
import {authRegister, authLogin} from '../actions';
import Authentication from '../components/Authentication';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    loading: state.authentication.isAuthenticathed
  }
}
const mapDispatchToProps = dispatch => {
  return {
    userRegister: data => {
      dispatch(authRegister(data))
    },
    userLogin: data => {
      dispatch(authLogin(data))
    }
  }
}
const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication)


export default Auth;
