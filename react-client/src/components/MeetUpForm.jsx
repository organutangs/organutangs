import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';

class MeetUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    sessionUser: 'User1',
    friend: '', 
    address: ''
  };
    this.friend = {value: ''};
    this.address = {value: ''};
    this.sessionUser = 'User1';
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.performPostRequest = this.performPostRequest.bind(this);
  } 

  handleFriendChange(event) {
    this.setState({friend: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    this.performPostRequest();
    alert('Retrieving Join information with friend ' + this.state.friend
           + ' starting from address, ' + this.state.address);
    event.preventDefault();
  }

  performPostRequest() {
    console.log('PerformPostRequest');
    axios.post('/meetings', this.state)
  .then(function (response) {
    alert('response ' + response);
  })
  .catch(function (error) {
    alert('error ' + error);
  });
  
  e.preventDefault();
}
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            USER TO MEET:
            <input type="text" value={this.state.friend} onChange ={this.handleFriendChange} />
          </label>
          <label>
            YOUR ADDRESS:
            <input type="text" value={this.state.address} onChange={this.handleAddressChange} />
          </label>
          <input type="submit" value="JOIN" />
        </form>
      </div>
    );
  }
}

export default MeetUpForm;