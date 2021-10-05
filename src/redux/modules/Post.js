import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { firestore } from "../../shared/firebase";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState
const initialState = {
  list: [],
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
          imsert_dt: _post.insert_dt,
        };
        post_list.push(post);
      });
      console.log(post_list);
      dispatch(setPost(post_list));
    });
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const initialPost = {
  user_info: {
    id: 0,
    user_name: "gabmin",
    user_profile:
      "https://t1.daumcdn.net/liveboard/HYPEBEAST/e18baa00daf5425ba12fff93d0cec4b4.JPG",
  },
  image_url:
    "https://t1.daumcdn.net/liveboard/HYPEBEAST/e18baa00daf5425ba12fff93d0cec4b4.JPG",
  contents: "조커이즈백",
  comment_cnt: 10,
  like_cnt: 4,
  insert_dt: "2021-10-05 15:10:22",
};

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
};

export { actionCreators };
