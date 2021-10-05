import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";

// Action

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//Action Creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//InitialState

const InitialState = {
  user: null,
  is_login: false,
};

//middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};
const signinFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth.createUserWithEmailAndPassword(id, pwd).then((user) => {
      console.log(user);

      auth.currentUser
        .updateProfile({
          displatName: user_name,
        })
        .then(() => {
          dispatch(setUser({ user_name: user_name, id: id, user_profile: "" }));
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  InitialState
);

//Action Creators export
const actionCreators = {
  signinFB,
  logOut,
  getUser,
  loginAction,
};

export { actionCreators };
