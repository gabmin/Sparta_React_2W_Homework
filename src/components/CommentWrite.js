import React from "react";
import { TextField, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const CommentWrite = (props) => {
  const [comment_text, setCommentText] = React.useState("");
  const dispatch = useDispatch();
  const { post_id } = props;

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    console.log(comment_text);
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    //댓글 입력 후 내용이 사라지게 하기 위해 취가 (value 값 설정해야함)
    setCommentText("");
  };
  return (
    <React.Fragment>
      <Grid display="flex" margin="20px 20px 20px 40px">
        <TextField
          label="댓글 입력하기"
          variant="standard"
          color="success"
          value={comment_text}
          onChange={onChange}
          focused
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              write();
            }
          }}
          sx={{ width: "100%", margin: "auto" }}
        />

        <IconButton aria-label="add" onClick={write}>
          <AddCommentIcon sx={{ color: "#2B7E37" }} />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
