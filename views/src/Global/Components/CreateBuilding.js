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
import CreateRoom from './CreateRoom';
import AccessModal from './AccessModal';
import Icon from '@material-ui/core/Icon';
const axios = require('axios');

class CreateBuilding extends Component {
  constructor(props){
    super(props);
    this.state = {
      floorCounter: this.props.floorCounter,
      apartsCounter:this.props.apartsCounter,
      openroomsconstructor:false,
      apidata:this.props.leveldata,
      buffer:0,
      openid:0,

    };
  }
  componentDidMount(){
      this.handleGetLevls();
      this.timer=setInterval(this.handleGetLevls,600);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  handleGetLevls = () => {
    axios.get("http://"+document.URL.split('/')[2].split(':')[0]+"/api/levels")
    .then(function(response) {
      this.setState({
        apidata: response.data.api_data
      });
    }.bind(this));
    this.props.AddLevels(this.state.apidata);
  };
  handleClickOpen = () => {
    this.setState({ openroomsconstructor: true });
  };
  render() {
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 CreateBuildingContainer">
          <div>
              {
                  this.state.apidata.map((row,index)=>
                    <div key={index} className="BuildingFloor">

                        {
                            row.rooms_information.map((row1,index)=>
                                <AccessModal data={row1} key={index}/>  
                            )
                        }
                        <p className="LevelCounter">{row.level_num}</p>
                        <p className="LevelCounterParagraph">{row.level_name}</p>
                        <CreateRoom  levelid={row.level_id}/>
                    </div>
                  )
              }
            <div>
              <CreateLevel />
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
    leveldata: state.leveldata
  }),
  dispatch => ({
    AddLevels:(data)=>{
      dispatch({type:'CHANGE_LEVELDATA',payload:data})
    }
  })
)(CreateBuilding);