import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.searched = this.searched.bind(this);
  }

  handleChangeName(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  handleChangePassword2(event) {
    event.preventDefault();
    this.setState({password2: event.target.value});
  }

  searched(e, user, pw, pw2) {
    e.preventDefault();
    axios.post('/users/register', {
      username: user,
      password: pw,
      password2: pw2
    })
    .then((response) =>{
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
    <form onSubmit={(event)=>{this.props.searched(event, this.state.username, this.state.password, this.state.password2)}}>
      <input type="text" value={this.state.username} onChange={this.handleChangeName}/>
      <input type="submit" value="Submit"/>

      <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
      <input type="submit" value="Submit"/>

      <input type="text" value={this.state.password2} onChange={this.handleChangePassword2}/>
      <input type="submit" value="Submit"/>
    </form>
    );
  }
}

export default Register;