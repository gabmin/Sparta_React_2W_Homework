import React from "react";
import Text from "../elements/Text";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getCookie, deleteCookie } from "../shared/Cookie";

const Header = (props) => {
  const classes = useStyles();
  const [is_login, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    let cookie = getCookie("user_id");
    console.log(cookie);
    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  if (is_login) {
    return (
      <React.Fragment>
        <Grid className={classes.Grid}>
          <Grid className={classes.Text}>
            <Text bold size="20px">
              Universe
            </Text>
          </Grid>
          <Grid className={classes.Grid}>
            <Button className={classes.Button}>내정보</Button>
            <Button className={classes.Button}>알림</Button>
            <Button
              className={classes.Button}
              onClick={() => {
                deleteCookie("user_id");
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
          <Button className={classes.Button}>회원가입</Button>
          <Button className={classes.Button}>로그인</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  Grid: {
    width: "100%",
    display: "flex",
    padding: "10px 40px",
  },
  Button: { width: "15vw" },
  Text: {
    marginRight: "20%",
  },
});

export default Header;
