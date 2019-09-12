import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Containers/App/App';
import * as serviceWorker from './serviceWorker';
// import reset file
import './index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>
</Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
