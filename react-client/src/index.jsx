import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import Map from './components/Map.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    
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
    </div>)
  }   
}

ReactDOM.render(<App />, document.getElementById('app'));