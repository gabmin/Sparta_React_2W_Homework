import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./Image";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const LIKE_TOGGLE = "LIKE_TOGGLE";
const DELETE_POST = "DELETE_POST";

//Action Creators
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_like = null) => ({
  post_id,
  is_like,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

//initialState
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

//게시글 가져오기
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

// 게시글 불러오기
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    //Paging 정보 가져오기
    let _paging = getState().post.paging;
    // 시작은 했는데 다음에 가져올 데이터가 없을 경우 리턴
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("Magazine");

    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

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
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("Magazine");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        // dispatch(setPost([post]));
        dispatch(SetIsLike([post]));
      });
  };
};

// 게시글 수정하기
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

const toggleLikeFB = (post_id, is_like = false) => {
  return function (dispatch, getState, { history }) {
    if (!getState().user.user) {
      return;
    }
    const PostDB = firestore.collection("Magazine");
    const likeDB = firestore.collection("Likes");

    const _idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_idx];
    const user_id = getState().user.user.uid;

    if (_post.is_like) {
      likeDB
        .where("post_id", "==", _post.id)
        .where("user_id", "==", user_id)
        .get()
        .then((docs) => {
          let batch = firestore.batch();
          docs.forEach((doc) => {
            batch.delete(likeDB.doc(doc.id));
          });
          batch.update(PostDB.doc(post_id), {
            like_cnt:
              _post.like_cnt - 1 < 1 ? _post.like_cnt : _post.like_cnt - 1,
          });
          batch.commit().then(() => {
            dispatch(likeToggle(post_id, !_post.is_like));
          });
        })
        .catch((err) => {
          console.log("에러가 발생했습니다.");
        });
    } else {
      likeDB.add({ post_id: post_id, user_id: user_id }).then((doc) => {
        PostDB.doc(post_id)
          .update({ like_cnt: _post.like_cnt + 1 })
          .then((doc) => {
            dispatch(likeToggle(post_id, !_post.is_like));
          });
      });
    }
  };
};

const SetIsLike = (_post_list, paging) => {
  return function (dispatch, getState, { history }) {
    if (!getState().user.is_login) {
      return;
    }
    const likeDB = firestore.collection("likes");
    const post_ids = _post_list.map((p) => p.id);
    let like_query = likeDB.where("post_id", "in", post_ids);

    like_query.get().then((like_docs) => {
      let like_list = {};
      like_docs.forEach((doc) => {
        if (like_list[doc.data().post_id]) {
          like_list[doc.data().post_id] = [
            ...like_list[doc.data().post_id],
            doc.data().user_id,
          ];
        } else {
          like_list[doc.data().post_id] = [doc.data().user_id];
        }
      });
      console.log(like_list);
      const user_id = getState().user.user.uid;
      let post_list = _post_list.map((p) => {
        if (like_list[p.id] && like_list[p.id].indexOf(user_id) !== -1) {
          return { ...p, is_like: true };
        }
        return p;
      });
      dispatch(setPost(post_list, paging));
    });
  };
};

const deletePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    if (!id) {
      window.alert("삭제할 수 없는 게시글 입니다.");
      return;
    }
    const postDB = firestore.collection("Magazine");

    postDB
      .doc(id)
      .delete()
      .then((res) => {
        dispatch(deletePost(id));
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        //중복값 제거 (acc 누적계산된 값, cur 현재 값)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => (a.id === cur.id) === -1)) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => (a.id === cur.id) === -1)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx].is_like = action.payload.is_like;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지운다.
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const initialPost = {
  image_url:
    "https://t1.daumcdn.net/liveboard/HYPEBEAST/e18baa00daf5425ba12fff93d0cec4b4.JPG",
  contents: "",
  comment_cnt: 0,
  like_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
  getOnePostFB,
  toggleLikeFB,
  SetIsLike,
  deletePostFB,
  deletePost,
};

export { actionCreators };
