import axios from 'axios';

const SET_USER = "SET_USER";
const CREATE_USER = "CREATE_USER";
const LOG_OUT = "LOG_OUT"

const setUser = loginInfo => ({
  type: SET_USER,
  loginInfo : loginInfo,
})

const createUser = signupInfo => ({
  type: CREATE_USER,
  signupInfo,
})

const logoutUser = () => ({
  type: LOG_OUT,
})


export default function reducer (user = {}, action) {
  switch (action.type) {

    case CREATE_USER:
      user.email = action.signupInfo.email;
      user.password = action.signupInfo.password;
      break;

    case SET_USER:
      console.log("action is...", action)
      console.log(action.loginInfo.email)
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

export const setCurrentUser = loginInfo => dispatch => {
  axios.post('/api/login', loginInfo)
    .then(res => res.data)
    .then(user =>   dispatch(setUser(user)))
    .catch(err => console.error('login unsuccessful'));

};

// export const setCurrentUser = (loginInfo) => {
//   console.log("loginInfo in user.js is...", loginInfo);
//   return (dispatch, getState) => {

//     return axios.post(`/api/login`)
//       .then(res => res.data)
//       .then(user => {
//         console.log("User in user.js is...", user);
//         const loginInfo = getState().loginInfo;
//         console.log("loginInfo on line 65 in user.js is", loginInfo);
//         dispatch(setUser(loginInfo));
//     })
//       .catch((err => console.error('login unsuccessful')))
//     }
// };


export const makeNewUser = (signupInfo) => dispatch => {
  axios.post('/api/signup', signupInfo)
    .then(res => dispatch(createUser(res.data)))
    .catch(err => console.error('signup unsuccessful'));
}

export const logout = () => dispatch => {
  axios.post('/api/logout')
  .then(res => res.data)
  .then(user => dispatch(logoutUser()))
  .catch(err => console.error('signout was unsuccessful'));
}
