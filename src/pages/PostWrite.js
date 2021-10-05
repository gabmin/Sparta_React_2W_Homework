import React from "react";
import Text from "../elements/Text";
import Image from "../elements/Image";
import Grid from "../elements/Grid";
import { TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import { history } from "../redux/confingStore";

const PostWrite = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const classes = useStyles();

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid margin="20px">
        <Text size="32px" bold>
          게시글 작성
        </Text>
        <input type="file"></input>
      </Grid>
      <Grid margin="20px">
        <Text size="20px" bold>
          미리보기
        </Text>
      </Grid>
      <Grid>
        <Image shape="rectangle"></Image>
      </Grid>
      <Grid>
        <TextField
          id="outlined-multiline-static"
          label="게시글 내용"
          multiline
          rows={5}
          placeholder="내용을 입력하세요"
          sx={{ width: "90%", m: "5vw" }}
        />
      </Grid>
      <Grid margin="0px 5vw">
        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<SaveIcon />}
          sx={{ backgroundColor: "black" }}
        >
          저장하기
        </Button>
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
