import { createStore } from 'redux';
import profileReducer from './reducer/profileReducer';

export default createStore(profileReducer);