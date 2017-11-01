import { connect } from 'react-redux';
import {authLogout} from '../actions';
import Menu from '../components/Menu';


const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.authentication.isAuthenticathed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authLogout())
    }
  }
}
const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)


export default Header;
