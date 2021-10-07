import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Text from "../elements/Text";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const LogIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };
  const changePwd = (e) => {
    setPwd(e.target.value);
  };
  const login = () => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

    const checkText = _reg.test(id);

    if (!checkText) {
      alert("이메일 형식이 아닙니다.");
    }
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid margin="30px">
        <Text size="32px" bold>
          로그인
        </Text>
      </Grid>
      <Grid margin="40px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="아이디"
          variant="standard"
          value={id}
          onChange={changeId}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        ></TextField>
      </Grid>
      <Grid margin="40px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="비밀번호"
          type="password"
          variant="standard"
          value={pwd}
          onChange={changePwd}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        ></TextField>
      </Grid>
      <Grid margin="60px 30px">
        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={login}
          sx={{ backgroundColor: "black" }}
        >
          로그인하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  TextField: {
    width: "90%",
    margin: "50px 0px",
  },
  Button: {
    width: "90%",
    fontSize: "20px",
  },
});

export default LogIn;
