import axios from 'axios';
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

/* ACTIONS DISPATCHER*/

export const get = url => {
  return dispatch => {
    axios.get(url)
      .then(res => {
        dispatch(getRecipes(res.data))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const getIngredients = url => {
  return dispatch => {
    axios.get(url)
      .then(res => {
        dispatch(addIngredients(res.data))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const getRestrictions = url => {
  return dispatch => {
    axios.get(url)
      .then(res => {
        dispatch(addRestrictions(res.data))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const addRecipe = data => {
  let cookies = {};
  if(Cookies.get('app') !== undefined){
    cookies = JSON.parse(Cookies.get('app'));
  }
  return dispatch => {
    axios({
        method: 'post',
        url: '/api/recipes/new',
        data,
        headers: {
          'token': 'token' in cookies ? cookies.token : null
        }
      })
      .then(res => {
        dispatch(createRecipe(data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const authRedirect = (path, redirectAfterLogin) => {
  return dispatch => {
    dispatch(push(`/login?next=${redirectAfterLogin}`));
  }
}

export const checkLogin = cookieData => {
  return dispatch => {
    cookieData = JSON.parse(cookieData);
    axios({method: 'post', url: '/checklogin', data: cookieData})
      .then(res => {
        console.log(res)
        if(res.data.exist){
          dispatch(setUser(res.data.user));
          dispatch(login(true));
        }
      })
      .catch(err => {
        console.error(err)
      })

  }
}

export const authLogin = data => {
  return dispatch => {
    dispatch(authLoaging(true));
    axios({method: 'post', url: '/users/login', data})
      .then(res => {
        const { data } = res;
        if(data.status == "OK"){
          const cookie = {user: data.user , token: data.token};
          if(Cookies.get('app') == undefined){
            Cookies.set('app', JSON.stringify(cookie));
          }
          dispatch(login(true));
          location = "/";
        }else{
          console.log(data)
        }

      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const authRegister = data => {
  return dispatch => {
    dispatch(authLoaging(true));
    axios({method: 'post', url: '/users/new', data})
      .then(res => {
        if(res.data.newRegister)
          location = "/login"
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const authLogout = ()=>{
  return dispatch => {
    const cookieData = JSON.parse(Cookies.get('app'));
    axios({method: 'post', url: '/logout', data: cookieData}).then(e => {
      Cookies.remove('app')
      dispatch(logout(true))
      location = "/";
    })
  }
}

/* ACTIONS */
export const authLoaging = (logged) => ({
  type: "AUTH_LOADING",
  payload: {
    logged
  }
});

export const login = (logged) => ({
  type: "LOGIN",
  payload: {
    logged
  }
});

export const logout = (logged) => ({
  type: "LOGOUT",
  payload: {
    logged
  }
});

export const createRecipe = ({name, detail, restrictions, ingredients }) => ({
  type: "CREATE_RECIPE",
  payload: {
    name,
    detail,
    restrictions,
    ingredients
  }
});

export const getRecipes = (recipes) => ({
  type: "GET_RECIPES",
  payload: {
    recipes
  }
});

export const addRestrictions = (restrictions) => ({
  type: "ADD_RESTRICTIONS",
  payload: {
    restrictions
  }
});

export const addIngredients = (ingredients) => ({
  type: "ADD_INGREDIENTS",
  payload: {
    ingredients
  }
});

export const setUser = (user) => ({
  type: "SET_USER",
  payload: {
    user
  }
});
