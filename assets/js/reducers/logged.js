import Cookies from 'js-cookie';
const isAuthenticathed = Cookies.get("app") !== undefined;
const auth = {isAuthenticathed, loading: false, user: null}

const authentication = (state = auth, action) => {
  switch(action.type) {
    case "LOGIN":
      return Object.assign({}, state, {isAuthenticated: action.payload.logged})
      break;
    case "LOGOUT":
      return Object.assign({}, state, {isAuthenticated: !action.payload.logged})
      break;
    case "LOGOUT":
      return Object.assign({}, state, {loading: !action.payload.logged})
      break;
    case "SET_USER":
      return Object.assign({}, state, {user: action.payload.user})
      break;
    default:
      return state;
  }
};
export default authentication