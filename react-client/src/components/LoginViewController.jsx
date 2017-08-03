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
        <div className="resultsContainer">
          <div className= "mapBox" >
            <div className="subMapBox">
              <Map
                markers={ props.items}
                center={{ lat: 40.751094, lng: -73.987597 }}
                containerElement={<div style={{height:100+'%'}} />}
                mapElement={<div style={{height:100+'%'}} />}
              />
            </div>
          </div>
          <div className="listContainer">
            <List handleClick={props.handleClick} items={props.items}/>
          </div>
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