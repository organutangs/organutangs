import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import Map from './components/Map.jsx';
import LoginViewController from './components/LoginViewController.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      auth: true
    };
  }

  componentDidMount() {
    //axios promise to backend for passport auth intialize auth state
  }

  render () {

    return (
      <div>
       <LoginViewController isLoggedIn={this.state.auth}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));