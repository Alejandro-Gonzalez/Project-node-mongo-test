import React, {Component} from 'react'
import { connect } from 'react-redux';
import Header from './Header'
import {get, checkLogin} from '../actions';
import Cookies from 'js-cookie';


class RenderLayout extends Component {
  componentWillMount() {
    this.props.getRecipes();
    
    if(Cookies.get('app') !== undefined){
      const cookieData = Cookies.get('app');
      this.props.checkLogin(cookieData);
    }
  }
  render(){
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: () => {
      dispatch(get("/api/recipes"));
    },
    checkLogin: coockieData => {
      dispatch(checkLogin(coockieData))
    }
  }
}
const Layout = connect(
  null,
  mapDispatchToProps
)(RenderLayout)

export default Layout;