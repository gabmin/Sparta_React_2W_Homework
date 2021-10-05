import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { Button } from "@mui/material";

const Card = (props) => {
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
      <Grid>
        <Text>좋아요</Text>
        <Text>댓글 {props.comment_cnt}</Text>
      </Grid>
    </React.Fragment>
  );
};

Card.defaultProps = {
  user_info: {
    user_name: "gabmin",
    user_profile:
      "https://static.smalljoys.me/2018/01/this-is-just-the-hair-blowing-in-the-wind-samoyeds_",
  },
  image_url:
    "https://static.smalljoys.me/2018/01/this-is-just-the-hair-blowing-in-the-wind-samoyeds_",
  contents: "안녕하세요~ 사모예드 입니다!",
  comment_cnt: 10,
  like_cnt: 10,
  insert_dt: "2021-10-04 12:00:00",
};

export default Card;
