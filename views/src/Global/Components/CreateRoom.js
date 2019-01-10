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
    value:'office',
    levelnum:'',
    leveltype:''
  };
  handleChangeNum(event){
      var val=event.target.value;
      this.setState({
          levelnum: val
      });
    
  }

  handleChangeName(event){
    var val=event.target.value;
    this.setState({
        levelname: val
    });
  }
  handleAccept(){
      
  }
  handleChangeValue = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleGetLevls = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/levels")
    .then(function(response) {
      this.props.AddLevels(response.data.api_data);
    }.bind(this))
    
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSend =()=>{
    var data = new FormData();
    data.append("roomnum", this.state.levelnum);
    data.append("roomtype", this.state.value);
    data.append("levelid", this.props.levelid);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("POST", "http://localhost/api/add/room");
    xhr.send(data);
    this.handleGetLevls();
    this.handleClose();
  }
  render() {
    return (
      <div className="right-button">
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            <AddIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Создать комнату</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Номер комнаты"
              type="text"
              fullWidth
              value={this.state.levelnum}
              onChange={this.handleChangeNum.bind(this)}
            />
            <FormControl className="selectfield">
              <InputLabel htmlFor="age-simple">Тип комнаты</InputLabel>
              <Select
                margin="dense"
                value={this.state.value}
                onChange={this.handleChangeValue}
              >
                <MenuItem value={'office'}>Офис</MenuItem>
                <MenuItem value={'stuff'}>Подсобка</MenuItem>
                <MenuItem value={'lec'}>Лекционная</MenuItem>
                <MenuItem value={'lab'}>Лаборатория</MenuItem>
                <MenuItem value={'stud'}>Аудитория</MenuItem>
              </Select>
            </FormControl>
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
    }
  })
)(CreateLevel);