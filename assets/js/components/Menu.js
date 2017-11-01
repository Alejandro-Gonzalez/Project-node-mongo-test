import React from 'react';
import Link from 'react-router-redux-dom-link';

const routes = [
  {
    path:"/",
    name: "Home"
  },
  {
    path: "login",
    name:"Iniciar Sesíon"
  },
  {
    path: "register",
    name:"Registrarme"
  },
  {
    path: "create",
    name: "Crear Receta"
  }
];

const Menu = ({isAuthenticated, logout}) => {
  console.log("isAuthenticated",isAuthenticated)
  return(
    <div>
      {
        routes.map(route => (
          isAuthenticated && (route.path == "login" || route.path == "register") ?  null : <Link key={route.path} to={`${route.path}`}>{route.name}</Link>
        ))
      }
      {isAuthenticated ? <span onClick={logout}>Cerrar sesión</span> : null}
    </div>
  )
};

export default Menu;