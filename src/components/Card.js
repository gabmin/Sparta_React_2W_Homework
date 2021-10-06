import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { Button } from "@mui/material";
import { history } from "../redux/confingStore";

const Card = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex width="90vw">
        <Grid is_flex margin="0px 35% 0px 0px">
          <Image shape="circle" src={props.user_profile}></Image>
          <Text bold>{props.user_info.user_name}</Text>
        </Grid>
        <Grid is_flex margin="-7%">
          <Text>{props.insert_dt}</Text>
          {props.is_me && (
            <Button
              size="midium"
              sx={{ color: "black" }}
              onClick={() => {
                history.push(`/write/${props.id}`);
              }}
            >
              수정
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid margin="25px 10px">
        <Text>{props.contents}</Text>
      </Grid>
      <Grid width="auto">
        <Image shape="rectangle" src={props.image_url}></Image>
      </Grid>
      <Grid is_flex>
        <Text>좋아요{props.like_cnt}</Text>
        <Text>댓글 {props.comment_cnt}</Text>
      </Grid>
    </React.Fragment>
  );
};

Card.defaultProps = {
  user_info: {
    user_name: "Gabmin",
    user_profile: "",
  },
  image_url: "",
  contents: "안녕하세여",
  comment_cnt: "4",
  like_cnt: "10",
  insert_dt: "2021-10-10 10:00:00",
  is_me: false,
};

export default Card;
