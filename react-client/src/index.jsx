import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import Map from './components/Map.jsx';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import LoginViewController from './components/LoginViewController.jsx';
import sampleData from './sampleData.js';
const io = require('socket.io-client');
const socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(sampleData.sampleData);
    this.state = {
      meetingLocations: sampleData.sampleData,
      auth: true
    };
  }

  handleClick(item) {
    console.log(item);
  }

  componentDidMount() {
    socket.on('meeting locations', (data) => {
      console.log('data', data);
      this.setState({ meetingLocations: data });
    })
  }

  render () {

    return (
      <div>
        <LoginViewController items={this.state.meetingLocations} isLoggedIn={this.state.auth}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));