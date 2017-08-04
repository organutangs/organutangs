import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';
const io = require('socket.io-client');
const socket = io();
import Autocomplete from 'react-google-autocomplete';

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
      console.log('match status data', data);
      this.setState({ status : data });
    });
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
    e.stopPropagation();
    var userId = this.state.userId;
    var friendId = this.state.friendId;
    console.log('this.state.userLocationAddress', this.state.userLocationAddress);
    var userLocation = { "address" : this.state.userLocationAddress, "coordinates": [0,0] };

    axios.post('/meetings', {
      userId,
      friendId,
      userLocation
    })
      .then(function (response) {
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
                  {/*<td>
                    <input type="text" value={ this.state.userLocationAddress } onChange={this.handleAddressChange} />
                  </td>*/}
                  <td>
                    <Autocomplete
                      onPlaceSelected={ (place) => {
                        this.setState({ userLocationAddress: place.formatted_address })
                      } }
                      types={['address']}
                      onChange={ this.handleAddressChange }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={this.handleSubmit}>Join</button>
          <p>{ this.state.status }</p>
      </div>
    );
  }
}

export default MeetUpForm;