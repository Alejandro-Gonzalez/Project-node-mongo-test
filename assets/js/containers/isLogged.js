import { connect } from 'react-redux';
import {authRedirect} from '../actions';
import Cookies from 'js-cookie';
import React from 'react';

const requireAuthentication = Component  => {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }
    checkAuth(){
      if(!this.props.isAuthenticated)
        this.props.redirect("login", this.props.location.pathname);
    }
    render() {
      return (
        <div>
          {this.props.isAuthenticated ? <Component {...this.props}/> : null}
        </div>
      )
    }
  }
  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.authentication.isAuthenticathed
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      redirect: (path, redirectAfterLogin) => {
        dispatch(authRedirect(path, redirectAfterLogin))
      }
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedComponent)
}

export default requireAuthentication