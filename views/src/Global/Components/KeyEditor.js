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

class KeyEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      keysdata:[]
    };
  }
  componentDidMount(){
    this.handleGetKeys();
    this.timer=setInterval(this.handleGetKeys,600);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  handleDeleteKey = (id)=>{
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/delete/key?id="+id)
    .then(function(response) {
      this.handleGetKeys();
      this.handleGetLevls();
    }.bind(this))

  }
  handleGetLevls = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/levels")
    .then(function(response) {
      this.props.AddLevels(response.data.api_data);
    }.bind(this))
    
  };
  handleGetKeys = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/keys")
    .then(function(response) {
      this.props.AddKeys(response.data.api_data);
      this.setState({
        keysdata:response.data.api_data
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
                    <TableCell>Ключ</TableCell>
                    <TableCell>Тип ключа</TableCell>
                    <TableCell>Дата создания</TableCell>
                    <TableCell>Пользователь ключа</TableCell>
                    <TableCell>Удалить</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.keysdata.map(row => {
                    return (
                      <TableRow key={row.key_id}>
                        <TableCell component="th" scope="row">
                          {row.key_data}
                        </TableCell>
                        <TableCell align="right">{row.key_access}</TableCell>
                        <TableCell align="right">{row.key_adddate}</TableCell>
                        <TableCell align="right">{row.key_user.user_name}</TableCell>
                        <TableCell><Button onClick={()=>this.handleDeleteKey(row.key_id)} variant="outlined" color="secondary">удалить</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <div>
              <KreateKey/>
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
)(KeyEditor);