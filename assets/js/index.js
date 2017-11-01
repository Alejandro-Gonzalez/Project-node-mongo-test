import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './reducers';

import CreateForm from './containers/CreateForm';
import List from './containers/List';
import Auth from './containers/Auth';
import Home from './containers/Home';
import Layout from './containers/Layout';
import requireAuthentication from './containers/isLogged';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Layout>
      <Router history={history}>
        <Route path="/" component={Home}/>
        <Route path="login" component={Auth}/> 
        <Route path="register" component={Auth}/>
        <Route path="create" component={requireAuthentication(CreateForm)}/>
      </Router>
    </Layout>
  </Provider>,
  document.querySelector('.js-root')
)
