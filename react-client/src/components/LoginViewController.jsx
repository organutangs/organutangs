import React from 'react';
import axios from 'axios';
import MeetUpForm from './MeetUpForm.jsx';
import Title from './Title.jsx';
import Map from './Map.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import List from './List.jsx';

function LoginViewController (props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) { //render our app if logged in
    return (
      <div>
        <Title />
        <MeetUpForm />
        <div style={{width:500, height:600, backgroundColor:'red', border: '2px solid black'}}>
          <Map
            containerElement={<div style={{height:100+'%'}} />}
            mapElement={<div style={{height:100+'%'}} />}
          />
        </div>
        <List items={props.items} />
      </div>)
  } else { //else render login
    return (
      <div>
        <Login/>
        <Register/>
      </div>
    )
  }
}

export default LoginViewController;