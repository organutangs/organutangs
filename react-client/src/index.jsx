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
    this.state = {
      auth: true,
      // meetingLocations: [],
      meetingLocations: sampleData.sampleData,
      midpoint: { "lat": 40.751094, "lng": -73.987597 }
    };

    this.setAuth = this.setAuth.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }


  setAuth(input) {
    this.setState({auth: input});
  }

  handleListClick(item) {
    console.log("item:", item);
  }

  handleMarkerClick(item, key) {
    console.log("item:", item, ", key:", key);
  };

  componentDidMount() {
    socket.on('meeting locations', (data) => {
      this.setState({ meetingLocations: data });
    });

    socket.on('match status', (data) => {
      console.log('match status inside index.jsx');
    });

    socket.on('midpoint', (data) => {
      console.log('midpoint listener data', data);
      this.setState({ midpoint: data });
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
                  markers={ this.state.meetingLocations }
                  center={ this.state.midpoint }
                  containerElement={<div style={{height:100+'%'}} />}
                  mapElement={<div style={{height:100+'%'}} />}
                  handleMarkerClick={this.handleMarkerClick.bind(this)}
                />
              </div>
            </div>
            <div className="listContainer">
              <List handleClick={this.handleListClick.bind(this)} items={this.state.meetingLocations}/>
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
