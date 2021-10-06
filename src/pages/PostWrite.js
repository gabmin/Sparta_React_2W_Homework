import React from "react";
import Text from "../elements/Text";
import Image from "../elements/Image";
import Grid from "../elements/Grid";
import Upload from "../elements/Upload";
import { TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/confingStore";
import LoginIcon from "@mui/icons-material/Login";
import { actionCreators as postActions } from "../redux/modules/Post";
import { actionCreators as imageActions } from "../redux/modules/Image";

const PostWrite = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const classes = useStyles();

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
    history.replace("/");
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>

        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={() => {
            history.replace("/login");
          }}
          sx={{ backgroundColor: "black" }}
        >
          로그인하기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid margin="20px">
        <Text size="32px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload></Upload>
      </Grid>
      <Grid margin="20px">
        <Text size="20px" bold>
          미리보기
        </Text>
      </Grid>
      <Grid>
        <Image
          shape="rectangle"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        ></Image>
      </Grid>
      <Grid>
        <TextField
          id="outlined-multiline-static"
          label="게시글 내용"
          multiline
          rows={5}
          value={contents}
          placeholder="내용을 입력하세요"
          sx={{ width: "90%", m: "5vw" }}
          onChange={changeContents}
        />
      </Grid>
      <Grid margin="0px 5vw">
        {is_edit ? (
          <Button
            className={classes.Button}
            variant="contained"
            endIcon={<SaveIcon />}
            sx={{ backgroundColor: "black" }}
            onClick={editPost}
          >
            수정하기
          </Button>
        ) : (
          <Button
            className={classes.Button}
            variant="contained"
            endIcon={<SaveIcon />}
            sx={{ backgroundColor: "black" }}
            onClick={addPost}
          >
            저장하기
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  TextField: {
    width: "90%",
    m: "100",
  },
  Button: {
    width: "90%",
    fontSize: "20px",
  },
});

export default PostWrite;
