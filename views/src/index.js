import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';


const initialState={
    floorCounter:[],
    apartsCounter:[],
    houseInformation:{},
    redirect:{
        page: '',
        user: null,
        id: null,

    },
    user:{
        id:'',
        pass:'',
    },
    leveldata:[],
    keysdata:[],
};

function playlist(state=initialState,action){
    if(action.type==='CHANGE_LEVELDATA'){
        return {
            ...state,
            leveldata: action.payload
        };
    }
    if(action.type==='REDIRECT_INFO'){
        return {
            ...state,
            redirect: action.payload
        };
    }
    if(action.type==='CHANGE_KEYSDATA'){
        return {
            ...state,
            keysdata: action.payload
        };
    }
    if(action.type==='LOGIN_SU'){
        return {
            ...state,
            user: action.payload
        };
    }
    return state;
}
const store = createStore(playlist, window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())




ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();