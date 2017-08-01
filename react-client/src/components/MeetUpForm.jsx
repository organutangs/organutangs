import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.friend = {value: ''}
    this.address = {value: ''}
    this.sessionUser = 'User1'
  } 

  handleChange(event) {
    this.setState({value: event.target.value});
  }
 
  handleSubmit(event) {
    performPostRequest();
    alert('Retrieving Join information with friend ' + this.friend.value
           + ' starting from address, ' + this.address.value);
    event.preventDefault();
  }

  performPostRequest() {
    axios.post('localhost:3000/meetings', {
      
  })
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
        <Title />
        <form onSubmit={this.handleSubmit}>
          <label>
            USER TO MEET:
            <input type="text" value={this.friend.value} onChange ={this.handleChange} />
          </label>
          <label>
            YOUR ADDRESS:
            <input type="text" value={this.address.value} onChange ={this.handleChange} />
          </label>
          <input type="submit" value="JOIN" />
        </form>
      </div>
    );
  }
}

export default Register;