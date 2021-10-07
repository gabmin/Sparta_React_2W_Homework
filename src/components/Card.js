import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { Button } from "@mui/material";
import { history } from "../redux/confingStore";
import { useSelector } from "react-redux";

const Card = (props) => {
  const post_list = useSelector((state) => state.comment.contents);

  console.log(post_list);
  return (
    <React.Fragment>
      <Grid is_flex width="90vw" margin="10px">
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
      <Grid margin="0px 10px" is_flex width="100vw">
        <Grid>
          <Text>좋아요 {props.like_cnt}</Text>
          <Text>댓글 {props.comment_cnt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Card.defaultProps = {
  user_info: {
    user_name: "",
    user_profile: "",
    user_id: "",
  },
  image_url: "",
  contents: "",
  comment_cnt: "0",
  like_cnt: "0",
  insert_dt: "2021-10-10 10:00:00",
  is_me: false,
};

export default Card;
