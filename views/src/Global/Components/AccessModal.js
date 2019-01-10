import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
const axios = require('axios');
const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialogWrapped extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userslist:[]
        }
    }
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    componentDidMount(){
        this.handleGetAccUsers();
    }
    handleListItemClick = value => {
        this.props.onClose(value);
    };
    handleGetAccUsers=()=>{
        axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/room/access?lid="+this.props.data.level_id+"&rid="+this.props.data.room_id+"&type="+this.props.data.room_type)
        .then(function(response) {
          this.setState({
            userslist: response.data.api_data
          });
        }.bind(this));
    };
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    console.log(this.state.userslist);
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Список допущенных пользователей</DialogTitle>
        <div>
          <List>
            {this.state.userslist.map((row,index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={row.user_data} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialogWrapped.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const DialogWrapped = withStyles(styles)(SimpleDialogWrapped);

class AccessModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selectedValue: emails[1],
            data:this.props.data
          };
    }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
        <div onClick={this.handleClickOpen} className="BuildingRoom">
            <p className="LevelCounterRoom">{this.props.data.room_num}</p>
            <p className="LevelCounterRoomType">
                {(this.props.data.room_type === 'office') && 'Офис'}
                {(this.props.data.room_type === 'stuff') && 'Кладовка'}
                {(this.props.data.room_type === 'lec') && 'Лекционная'}
                {(this.props.data.room_type === 'lab') && 'Лаборатория'}
                {(this.props.data.room_type === 'stud') && 'Аудитория'}
            </p>
            <DialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
            data={this.props.data}
            />
        </div>
    );
  }
}

export default AccessModal;