import React from "react";
import Text from "../elements/Text";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/confingStore";
import NotiBadge from "./Notibadge";

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid className={classes.Grid}>
          <Grid
            className={classes.Text}
            onClick={() => {
              history.push("/");
            }}
          >
            <Text bold size="20px">
              Universe
            </Text>
          </Grid>
          <Grid className={classes.Grid}>
            <Button className={classes.Button} sx={{ color: "black" }}>
              내정보
            </Button>
            <Button
              className={classes.Button}
              sx={{ color: "black" }}
              onClick={() => {
                history.push("/noti");
              }}
            >
              알림
            </Button>
            <NotiBadge
              onClick={() => {
                history.push("/noti");
              }}
            ></NotiBadge>
            <Button
              className={classes.Button}
              sx={{ color: "black" }}
              onClick={() => {
                dispatch(userActions.logoutFB({}));
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid className={classes.Grid}>
        <Grid className={classes.Text}>
          <Text bold size="20px">
            Universe
          </Text>
        </Grid>
        <Grid className={classes.Grid}>
          <Button
            className={classes.Button2}
            sx={{ color: "black" }}
            onClick={() => {
              history.push("/signin");
            }}
          >
            회원가입
          </Button>
          <Button
            className={classes.Button2}
            sx={{ color: "black" }}
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  Grid: {
    width: "100%",
    display: "flex",
    padding: "10px 35px",
  },
  Button: { width: "15vw" },
  Button2: { width: "20vw" },
  Text: {
    marginRight: "17%",
  },
});

export default Header;
