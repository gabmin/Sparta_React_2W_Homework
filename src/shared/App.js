import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Grid from "../elements/Grid";
import LogIn from "../pages/LogIn";
import SignIn from "../pages/SignIn";
import Header from "../components/Header";

function App() {
  return (
    <React.Fragment>
      <Grid isRoot>
        <Header></Header>
        <BrowserRouter>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signin" exact component={SignIn} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
