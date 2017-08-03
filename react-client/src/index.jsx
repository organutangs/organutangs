import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import Map from './components/Map.jsx';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import Map from './components/Map.jsx';
import LoginViewController from './components/LoginViewController.jsx';
import sampleData from './sampleData.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: sampleData,
      auth: true
    };
  }

  handleClick(item) {
    console.log(item);
  }

  componentDidMount() {
  }

  render () {

    return (
      <div>
<<<<<<< Updated upstream
       <LoginViewController items={this.state.items} isLoggedIn={this.state.auth}/>
      </div>)
  }
=======
        <Title /> 
        <MeetUpForm />
        <div style={{width:500, height:600, backgroundColor:'red', border: '2px solid black'}}>
          <Map
            containerElement={<div style={{height:100+'%'}} />}
            mapElement={<div style={{height:100+'%'}} />}
          />
        </div>  
    </div>)
  }   
>>>>>>> Stashed changes
}

ReactDOM.render(<App />, document.getElementById('app'));