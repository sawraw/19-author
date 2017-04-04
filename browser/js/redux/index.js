import { combineReducers } from 'redux';
import users from './users';
import user from './user';
import stories from './stories';

export default combineReducers({ users, stories, user });
