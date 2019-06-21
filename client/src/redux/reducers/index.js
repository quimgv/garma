import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import sideMenu from './sideMenu';
import favour from './favour';

export default combineReducers({
    alert,
    auth,
    sideMenu,
    favour
});