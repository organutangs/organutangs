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
        <div className= "mapBox" style={{width:500, height:600, backgroundColor:'red', border: '2px solid black'}}>
          <div className="subMapBox">
            <Map
              containerElement={<div className="mapContainer" style={{height:100+'%'}} />}
              mapElement={<div className="mapElement" style={{height:100+'%'}} />}
            />
          </div>
        </div>
        <div className="listContainer">
          <List items={props.items}/>
        </div>
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