import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';

class MeetUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: 'User1',
      friendId: '',
      userLocationAddress: ''
    };

    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFriendChange(event) {
    this.setState({ friendId: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ userLocationAddress: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // { friendId, userLocationAddress } = this.state;
    var friendId = this.state.friendId;
    var userLocationAddress = this.state.userLocationAddress;

    axios.post('/meetings', {
      friendId,
      userLocation: {
        "address" : userLocationAddress,
        "coordinates": [0,0]
      }
    })
      .then(function (response) {
        console.log('Posted successfully');
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
            <input type="text" value={ this.state.friendId } onChange ={this.handleFriendChange} />
          </label>
          <label>
            YOUR ADDRESS:
            <input type="text" value={ this.state.userLocationAddress } onChange={this.handleAddressChange} />
          </label>
          <input type="submit" value="JOIN" />
        </form>
      </div>
    );
  }
}

export default MeetUpForm;