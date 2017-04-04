import axios from 'axios';

const SET_USER = "SET_USER";
const CREATE_USER = "CREATE_USER";
const LOG_OUT = "LOG_OUT"

const setUser = loginInfo => ({
  type: SET_USER,
  loginInfo,
})

const createUser = signupInfo => ({
  type: CREATE_USER,
  signupInfo,
})

const logout = logout => ({
  type: LOG_OUT,
})


export default function reducer (user = {}, action) {
  switch (action.type) {

    case CREATE_USER:
      user.email = action.signupInfo.email;
      user.password = action.signupInfo.password;
      break;

    case SET_USER:
      user.email = action.loginInfo.email;
      user.password = action.loginInfo.password;
      break;

    case LOG_OUT:
      user.email = '';
      user.password = '';
      break;

    default:
      return user;
  }
  return user;
}

export const setCurrentUser = (loginInfo) => dispatch => {
  axios.post('/api/login', loginInfo)
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.error('login unsuccessful'));

};

export const makeNewUser = (signupInfo) => dispatch => {
  axios.post('/api/signup', signupInfo)
    .then(res => dispatch(createUser(res.data)))
    .catch(err => console.error('signup unsuccessful'));
}

export const logout = () => dispatch => {
  axios.post('/api/logout')
  .then(res => dispatch(logout()))


}
