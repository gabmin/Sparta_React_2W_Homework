import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { Button } from "@mui/material";

const Card = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Grid is_flex>
        <Image shape="circle" src={props.user_profile}></Image>
        <Text bold>{props.user_info.user_name}</Text>
        <Text>{props.insert_dt}</Text>
        <Button size="midium" sx={{ color: "black" }}>
          수정
        </Button>
      </Grid>
      <Grid>
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
    user_name: "",
    user_profile: "",
  },
  image_url: "",
  contents: "",
  comment_cnt: "",
  like_cnt: "",
  insert_dt: "",
};

export default Card;
