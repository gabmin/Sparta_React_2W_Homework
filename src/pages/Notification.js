import React from "react";
import { Grid } from "@mui/material";
import Text from "../elements/Text";
import Image from "../elements/Image";

const Notification = (props) => {
  const noti = [
    {
      user_name: "gabmin",
      post_id: "post1",
      image_url: "https://t1.daumcdn.net/cfile/blog/21227A42531BEF2422",
    },
    {
      user_name: "gabmin",
      post_id: "post2",
      image_url: "https://t1.daumcdn.net/cfile/blog/21227A42531BEF2422",
    },
    {
      user_name: "gabmin",
      post_id: "post3",
      image_url: "https://t1.daumcdn.net/cfile/blog/21227A42531BEF2422",
    },
    {
      user_name: "gabmin",
      post_id: "post4",
      image_url: "https://t1.daumcdn.net/cfile/blog/21227A42531BEF2422",
    },
  ];

  return (
    <React.Fragment>
      <Grid padding="16px" backgroundColor="#ffffff">
        {noti.map((n) => {
          return (
            <Grid
              margin="10px 10px"
              display="flex"
              width="auto"
              backgroundColor="#00804514"
            >
              <Grid margin="10px">
                <Image shape="square" size="70" src={n.image_url}></Image>
              </Grid>
              <Grid margin="auto 10px">
                <Text size="15px">
                  <b>{n.user_name}</b>님이 게시글에 댓글을 남겼습니다!!
                </Text>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
