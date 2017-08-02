import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.searched = this.searched.bind(this);
  }

  handleChangeName(event) {
    event.preventDefault();
    this.setState({userName: event.target.value});
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  searched(e, user, pw) {
    e.preventDefault();
    axios.post('/users/login', {
      username: user,
      password: pw
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
    <form onSubmit={(event)=>{this.props.searched(event, this.state.userName, this.state.password, this.state.password2)}}>
      <input type="text" value={this.state.userName} onChange={this.handleChangeName}/>
      <input type="submit" value="Submit"/>

      <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
      <input type="submit" value="Submit"/>
    </form>
    );
  }
}

export default Login;