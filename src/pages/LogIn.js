import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Text from "../elements/Text";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import { setCookie } from "../shared/Cookie";

const LogIn = (props) => {
  const classes = useStyles();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };
  const changePwd = (e) => {
    setPwd(e.target.value);
  };
  const login = () => {
    setCookie("user_id", id, 3);
    setCookie("user_pwd", pwd, 3);
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
        ></TextField>
      </Grid>
      <Grid margin="40px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="비밀번호"
          variant="standard"
          value={pwd}
          onChange={changePwd}
        ></TextField>
      </Grid>
      <Grid margin="60px 30px">
        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={login}
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
    backgroundColor: "#17bb77",
  },
});

export default LogIn;
