import React from "react";
import Text from "../elements/Text";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Header = (props) => {
  const classes = useStyles();
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
    marginRight: "30%",
  },
});

export default Header;
