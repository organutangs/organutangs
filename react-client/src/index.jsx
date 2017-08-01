import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import MeetUpForm from './components/MeetUpForm.jsx';
import Map from './components/Map.jsx';
import Title from './components/Title.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
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
        <Map />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));