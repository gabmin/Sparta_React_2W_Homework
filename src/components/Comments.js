import React from "react";
import { Grid } from "@mui/material";
import Text from "../elements/Text";
import Image from "../elements/Image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Permit from "../shared/Permit";

const Comments = (props) => {
  const { user_profile, user_name, user_id, contents, insert_dt, post_id } =
    props;
  return (
    <React.Fragment>
      <Grid display="flex" width="97%">
        <Grid display="flex" width="22%" margin="10px 20px">
          <Image shape="circle" src={user_profile} />
          <Grid margin="0px 0px 0px 10px">
            <Text bold>{user_name}</Text>
          </Grid>
        </Grid>
        <Grid margin="10px 0px" width="42%" textAlign="center">
          <Text>{contents}</Text>
        </Grid>
        <Grid margin="0px 10px" width="17%">
          <Text>{insert_dt}</Text>
        </Grid>
        <Permit>
          <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
        </Permit>
      </Grid>
    </React.Fragment>
  );
};

Comments.defaultProps = {
  user_name: "gabmin",
  user_profile:
    "https://w.namu.la/s/45507892b4f48b2b3d4a6386f6dae20c28376a8ef5dfb68c7cc95249ec358e3e68df77594766021173b2e6acf374b79ce02e9eeef61fcdf316659e30289e123fbddf6e5ec3492eddbc582ee5a59a2ff5d6ee84f57ad19277d179b613614364ad",
  contents: "안녕하세요",
  user_id: "",
  post_id: "1",
  insert_dt: "2021-10-10 10:10:10",
};

export default Comments;
