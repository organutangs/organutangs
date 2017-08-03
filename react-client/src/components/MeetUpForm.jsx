import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';
const io = require('socket.io-client');
const socket = io();

class MeetUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      friendId: '',
      userLocationAddress: '',
      status: 'none'
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.on('match status', (data) => {
      console.log('socket on');
      this.state.status = data;
    });
  }

  handleUserChange(event) {
    this.setState({ userId: event.target.value });
  }

  handleUserChange(event) {
    this.setState({ userId: event.target.value });
  }

  handleFriendChange(event) {
    this.setState({ friendId: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ userLocationAddress: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var userId = this.state.userId;
    var friendId = this.state.friendId;
    var userLocation = { "address" : this.state.userLocationAddress, "coordinates": [0,0] };

    axios.post('/meetings', {
      userId,
      friendId,
      userLocation
    })
      .then(function (response) {
        // TODO: render their location as a marker on Map
        socket.emit('user looking for friend',
          {
            userId,
            friendId,
            userLocation
          });
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
            <table>
              <tbody>
                <tr>
                  <td><label>User id:</label></td>
                  <td><input type="text" value={ this.state.userId } onChange ={this.handleUserChange} /></td>
                </tr>
                <tr>
                  <td><label>Friend to Meet:</label></td>
                  <td><input type="text" value={ this.state.friendId } onChange ={this.handleFriendChange} /></td>
                </tr>
                <tr>
                  <td><label>Your Location:</label></td>
                  <td><input type="text" value={ this.state.userLocationAddress } onChange={this.handleAddressChange} /></td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="JOIN" />
          </form>
          <p>{ this.state.status }</p>
      </div>
    );
  }
}

export default MeetUpForm;