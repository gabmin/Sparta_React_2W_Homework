import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";
import styled from "styled-components";
import { Button } from "@mui/material";
import { history } from "../redux/confingStore";
import { useDispatch } from "react-redux";
import Likes from "./likes";
import { actionCreators as postActions } from "../redux/modules/Post";

const Card = React.memo((props) => {
  const dispatch = useDispatch();
  console.log(props);

  return (
    <React.Fragment>
      <Grid is_flex width="88vw" margin="10px">
        <Grid is_flex margin="0px 28% 0px 0px">
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
          {props.is_me && (
            <Button
              size="midium"
              sx={{ color: "black", padding: "0px" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(postActions.deletePostFB(props.id));
              }}
            >
              삭제하기
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
        <Likey>
          <Grid>
            <Likes
              onClick={() => {
                dispatch(postActions.toggleLikeFB(props.id));
              }}
              is_like={props.is_like}
            />
          </Grid>
          <Grid width="200px" margin="0px -20px 0px -60px">
            <Text>좋아요 {props.like_cnt}개</Text>
          </Grid>
          <Grid>
            <Text>댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Likey>
      </Grid>
    </React.Fragment>
  );
});

Card.defaultProps = {
  user_info: {
    user_name: "",
    user_profile: "",
    user_id: "",
  },
  image_url: "",
  contents: "",
  comment_cnt: "0",
  like_cnt: 10,
  insert_dt: "2021-10-10 10:00:00",
  is_like: false,
  is_me: false,
};

const Likey = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default Card;
