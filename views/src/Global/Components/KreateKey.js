import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const axios = require('axios');

class CreateLevel extends React.Component {
  state = {
    open: false,
    levelid:0,
    roomid:0,
    levelname:0,
    userid:0,
    keytype:'student',
    userslist:[],
    levellist:[],
    roomlist:[],
    keysarray:[]
  };
  handleChangeNum(event){
      var val=event.target.value;
      this.setState({
          levelnum: val
      });
    
  }
  handleGetKeys = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/keys")
    .then(function(response) {
      this.setState({
        keysarray:response.data.api_data
      });
      this.props.AddKeys(response.data.api_data);
    }.bind(this))
    this.props.AddKeys(this.state.keysarray);
  };
  componentDidMount(){
    this.handleLoadUsers();
    this.handleLoadLevels();
    console.log(this.state.levellist);
  }
  handleChangeName(event){
    var val=event.target.value;
    this.setState({
        levelname: val
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleLoadLevels = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/levels")
    .then(function(response) {
      this.setState({
        levellist: response.data.api_data,
      });
      console.log(this.state.levellist);
    }.bind(this))
  }
  handleLoadUsers = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/users")
    .then(function(response) {
      this.setState({
        userslist: response.data,
      });
    }.bind(this))
  }
  handleGetLevls = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/levels")
    .then(function(response) {
      this.props.AddLevels(response.data.api_data);
    }.bind(this))
    
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChangeValueType = (e) => {
    this.setState({
      keytype: e.target.value
    });
  }
  handleChangeValueUserid = (e) => {
    this.setState({
      userid: e.target.value
    });
  }
  handleChangeValueRoomid = (e) => {
    this.setState({
      roomid: e.target.value
    });
    console.log(this.state.roomid);
  }
  handleChangeValueLevelid = (e) => {
    this.setState({
      levelid: e.target.value
    });
    for(var i=0;i<this.state.levellist.length;i++){
      if(e.target.value === this.state.levellist[i].level_id){
        this.setState({
          roomlist:this.state.levellist[i].rooms_information
        });
      }
    }
  }
  handleSend =()=>{
    var data = new FormData();
    data.append("user_id", this.state.userid);
    data.append("level_id", this.state.levelid);
    data.append("room_id", this.state.roomid);
    data.append("key_type", this.state.keytype);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "http://localhost/api/add/key");
    
    xhr.send(data);
    this.setState({
      levelid:0,
      roomid:0,
      userid:0,
      keytype:'student',
    });
    this.handleGetKeys();
    this.handleClose();
  }
  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            <AddIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Создать ключ</DialogTitle>
          <DialogContent>
            <FormControl className="selectfield">
              <InputLabel htmlFor="age-simple">Тип комнаты</InputLabel>
              <Select
                margin="dense"
                value={this.state.keytype}
                onChange={this.handleChangeValueType}
              >
                <MenuItem value={'student'}>Ключ студента</MenuItem>
                <MenuItem value={'default'}>Ключ обычный</MenuItem>
                <MenuItem value={'stuff'}>Ключ персонала</MenuItem>
                <MenuItem value={'prepod'}>Ключ преподавателя</MenuItem>
                <MenuItem value={'security'}>Ключ охранника</MenuItem>
                <MenuItem value={'admin'}>Ключ админа</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="selectfield">
              <InputLabel htmlFor="age-simple">Пользователь</InputLabel>
              <Select
                margin="dense"
                value={this.state.userid}
                onChange={this.handleChangeValueUserid}
              >
                {
                  this.state.userslist.map((row,index)=>
                    <MenuItem key={index} value={row.user_id}>{row.user_name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            {
            (this.state.keytype === 'default')&&
              
            <FormControl className="selectfield">
              <InputLabel htmlFor="age-simple">Этаж</InputLabel>
              <Select
                margin="dense"
                value={this.state.levelid}
                onChange={this.handleChangeValueLevelid}
              >
                {
                  this.state.levellist.map((row1,index)=>
                    <MenuItem key={index} value={row1.level_id}>{row1.level_num}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            
            }
            {
            (this.state.keytype === 'default' && this.state.roomlist.length!==0)&&
              
            <FormControl className="selectfield">
              <InputLabel htmlFor="age-simple">Комната</InputLabel>
              <Select
                margin="dense"
                value={this.state.roomid}
                onChange={this.handleChangeValueRoomid}
              >
                {
                  this.state.roomlist.map((row1,index)=>
                    <MenuItem key={index} value={row1.room_id}>{row1.room_num}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Закрыть
            </Button>
            <Button onClick={this.handleSend} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default connect(
  state=>({
    leveldata: state.leveldata
  }),
  dispatch => ({
    AddLevels:(data)=>{
      dispatch({type:'CHANGE_LEVELDATA',payload:data})
    },
    AddKeys:(data)=>{
      dispatch({type:'CHANGE_KEYSDATA',payload:data})
    }
  })
)(CreateLevel);