import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CreateLevel from './CreateLevel';
import KreateKey from './KreateKey';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const axios = require('axios');

class UserEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[]
    };
  }
  componentDidMount(){
    this.handlegetUsers();
    this.timer=setInterval(this.handlegetUsers,600);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  handlegetUsers = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/users")
    .then(function(response) {
      this.setState({
        users:response.data
      });
    }.bind(this))
  };
  render() {
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 CreateBuildingContainer padding20">
            <div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Пользователь</TableCell>
                    <TableCell>Тип доступа</TableCell>
                    <TableCell>Дата регистрации</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map(row => {
                    return (
                      <TableRow key={row.user_id}>
                        <TableCell component="th" scope="row">{row.user_name}</TableCell>
                        <TableCell align="right">{row.user_status}</TableCell>
                        <TableCell align="right">{row.user_regdate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <div>
            </div>
          </div>
        </div>
        </div>
     </div>
    );
  }
}

export default connect(
  state=>({
    keysdata: state.keysdata
  }),
  dispatch => ({
    AddKeys:(data)=>{
      dispatch({type:'CHANGE_KEYSDATA',payload:data})
    },
    AddLevels:(data)=>{
      dispatch({type:'CHANGE_LEVELDATA',payload:data})
    }
  })
)(UserEditor);