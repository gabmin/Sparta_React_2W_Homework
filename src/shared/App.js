import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/confingStore";
import { ConnectedRouter } from "connected-react-router";
import MainPage from "../pages/MainPage";
import Grid from "../elements/Grid";
import LogIn from "../pages/LogIn";
import SignIn from "../pages/SignIn";
import Detail from "../pages/Detail";
import Notification from "../pages/Notification";
import Header from "../components/Header";
import Permit from "./Permit";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/AddToPhotos";
import PostWrite from "../pages/PostWrite";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  });

  return (
    <React.Fragment>
      <Grid isRoot>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/cmt/:id" exact component={Detail} />
          <Route path="/noti" exact component={Notification} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Fab
          aria-label="add"
          className={classes.button}
          color="black"
          sx={{ position: "fixed", backgroundColor: "#FFCF94" }}
          onClick={() => {
            history.push("/write");
          }}
        >
          <AddIcon />
        </Fab>
      </Permit>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  button: {
    right: "7%",
    bottom: "10%",
    padding: "24px",
  },
});

export default App;
