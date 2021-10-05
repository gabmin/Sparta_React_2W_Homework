import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import Text from "../elements/Text";
import { makeStyles } from "@mui/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  return (
    <React.Fragment>
      <Grid margin="30px">
        <Text size="32px" bold>
          회원가입
        </Text>
      </Grid>
      <Grid margin="30px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="아이디"
          variant="standard"
          onChange={(e) => {
            setId(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid margin="30px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="닉네임"
          variant="standard"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid margin="30px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="비밀번호"
          variant="standard"
          type="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid margin="30px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="비밀번호 확인"
          variant="standard"
          type="password"
          onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid margin="50px 30px">
        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<AssignmentIndIcon />}
          sx={{ backgroundColor: "black" }}
          onClick={() => {
            let _reg =
              /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

            const checkText = _reg.test(id);

            if (id === "" || pwd === "" || user_name === "") {
              window.alert("모든 정보를 입력해주세요");
              return;
            }

            if (!checkText) {
              window.alert("이메일 형식이 아닙니다.");
              return;
            }

            if (pwd !== pwd_check) {
              window.alert("패스워드가 같지 않습니다.");
              return;
            }

            dispatch(userActions.signinFB(id, pwd, user_name));
          }}
        >
          회원가입하기
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
    backgroundColor: "#17bb77",
  },
});

export default SignIn;
