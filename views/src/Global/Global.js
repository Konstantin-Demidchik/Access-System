import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateBuilding from './Components/CreateBuilding';
import KeyEditor from './Components/KeyEditor';
import UserEditor from './Components/UserEditor';

class Global extends Component {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    var value = this.state.value;
    return(
     <div className="container-fluid">
        <div className="row">
          <div className="col-12 custom">
        <AppBar position="static" className="appbar">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Идентифицировать здание" />
            <Tab label="Управление ключами" />
            <Tab label="Управление пользователями" />
          </Tabs>
        </AppBar>
        {value === 0 && <CreateBuilding/>}
        {value === 1 && <KeyEditor/>}
        {value === 2 && <UserEditor/>}
          </div>
        </div>
     </div>
    );
  }
}

export default Global;