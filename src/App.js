import React from 'react';
import './App.scss';
import Navbar from "./components/layout/Navbar";
import { Provider } from 'react-redux';
import store from './components/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './components/actions/authActions';
import FriendsList from './components/layout/FriendsList';

const state = {
  isAuthentificated: false
};


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));


  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = './login';
  }
  else {
    state.isAuthentificated = true;
  }
}

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <FriendsList />
    </Provider>
  );
}

export default App;
