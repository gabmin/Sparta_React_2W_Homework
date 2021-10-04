import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Text from "../elements/Text";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";

const LogIn = (props) => {
  const classes = useStyles();

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
        ></TextField>
      </Grid>
      <Grid margin="40px">
        <TextField
          className={classes.TextField}
          id="standard-basic"
          label="비밀번호"
          variant="standard"
        ></TextField>
      </Grid>
      <Grid margin="60px 30px">
        <Button
          className={classes.Button}
          variant="contained"
          endIcon={<LoginIcon />}
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
