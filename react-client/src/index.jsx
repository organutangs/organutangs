import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import Map from './components/Map.jsx';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import sampleData from './sampleData.js';
import LogoutButton from './components/LogoutButton.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
const io = require('socket.io-client');
const socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(sampleData.sampleData);
    this.state = {
      // items: sampleData,
      auth: false,
      meetingLocations: sampleData.sampleData
    };
    this.setAuth = this.setAuth.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  setAuth(input) {
    this.setState({auth: input});
  }

  handleClick(item) {
    console.log("item:", item);
  }

  componentDidMount() {
    socket.on('meeting locations', (data) => {
      console.log('data', data);
      this.setState({ meetingLocations: data });
    });
  }

//this render method renders title,meetup,map if you're logged in, else it renders login/register components
  render () {
    return (
      <div>
      {this.state.auth ? (
        <div>
          <LogoutButton setAuth={this.setAuth}/>
          <Title />
          <MeetUpForm />
          <div className="resultsContainer">
            <div className= "mapBox" >
              <div className="subMapBox">
                <Map
                  markers={this.state.meetingLocations}
                  center={{ lat: 40.751094, lng: -73.987597 }}
                  containerElement={<div style={{height:100+'%'}} />}
                  mapElement={<div style={{height:100+'%'}} />}
                />
              </div>
            </div>
            <div className="listContainer">
              <List handleClick={this.handleClick.bind(this)} items={this.state.meetingLocations}/>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Login setAuth={this.setAuth} />
          <Register/>
        </div>
      )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));