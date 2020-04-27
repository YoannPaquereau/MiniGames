import React from 'react';
import './App.scss';
import Navbar from "./components/layout/Navbar";
import { Provider } from 'react-redux';
import store from './components/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
import { setCurrentUser, logoutUser, getUserData } from './components/actions/authActions';

const state = {
  isAuthentificated: false,
};


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  getUserData(decoded.id)
    .then(res => {
      decoded.username = res[0].username;
      decoded.email = res[0].email;
      decoded.friends = res[0].friends;
      decoded.friendsRequest = res[0].friendsRequest;
      decoded.friendsRequestSend = res[0].friendsRequestSend;
      store.dispatch(setCurrentUser(decoded));
    })

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
    </Provider>
  );
}

export default App;
