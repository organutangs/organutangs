import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';

class MeetUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: 'User1',
      friendId: '',
      userLocation: ''
    };

    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.performPostRequest = this.performPostRequest.bind(this);
  } 

  handleFriendChange(event) {
    this.setState({friendId: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({userLocation: event.target.value});
  }

  handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    this.performPostRequest();
    alert('Retrieving Join information with friend ' + this.state.friendId
           + ' starting from address, ' + this.state.userLocation);
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
}
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            USER TO MEET:
            <input type="text" value={this.state.friendId} onChange ={this.handleFriendChange} />
          </label>
          <label>
            YOUR ADDRESS:
            <input type="text" value={this.state.userLocation} onChange={this.handleAddressChange} />
          </label>
          <input type="submit" value="JOIN" />
        </form>
      </div>
    );
  }
}

export default MeetUpForm;