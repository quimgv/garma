import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import sideMenu from './sideMenu';
import favour from './favour';
import modal from './modal';
import requests from './requests';

export default combineReducers({
    alert,
    auth,
    sideMenu,
    favour,
    modal,
    requests
});