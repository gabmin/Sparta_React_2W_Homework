import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./Image";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

//initialState
const initialState = {
  list: [],
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("Magazine");
    //getState는 Store에 있는 정보를 가져온다
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    var _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          dispatch(imageActions.uploadImage(url));
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
            })
            .catch((err) => {
              window.alert("포스트 작성에 실패하였습니다.");
              console.log("post 작성 실패!", err);
            });
        })
        .catch((err) => {
          window.alert("포스트 작성에 실패하였습니다.");
          console.log(err);
        });
    });
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("Magazine");

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {
        let _post = doc.data();
        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          contents: _post.contents,
          image_url: _post.image_url,
          comment_cnt: _post.comment_cnt,
          insert_dt: _post.insert_dt,
        };
        post_list.push(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const postDB = firestore.collection("Magazine");
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
    } else {
      const user_id = getState().user.user;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("포스트 작성에 실패하였습니다.");
            console.log(err);
          });
      });
    }
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

const initialPost = {
  image_url:
    "https://t1.daumcdn.net/liveboard/HYPEBEAST/e18baa00daf5425ba12fff93d0cec4b4.JPG",
  contents: "",
  comment_cnt: 10,
  like_cnt: 4,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
};

export { actionCreators };
