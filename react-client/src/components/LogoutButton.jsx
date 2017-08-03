import React from 'react';
import axios from 'axios';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.logoutFunc = this.logoutFunc.bind(this);
  }

  //set the state of Auth to false from database req.isAuthenticated
  logoutFunc(e) {
    e.preventDefault();
    axios.get('/users/logout')
    .then((res)=>{
      console.log(res.data);
      this.props.setAuth(res.data);
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <button onClick={(event)=>{this.logoutFunc(event)}} title="Logout" color="#841584" />
      </div>
    );
  }
}

export default LogoutButton;