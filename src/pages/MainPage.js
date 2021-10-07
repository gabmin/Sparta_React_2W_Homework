import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import { actionCreators as postActions } from "../redux/modules/Post";
import InfinityScroll from "../shared/InfinityScroll";
import { history } from "../redux/confingStore";
import { Grid } from "@mui/material";

const MainPage = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Grid
                key={p.id}
                onClick={() => {
                  history.push(`/cmt/${p.id}`);
                }}
              >
                <Card key={p.id} {...p} is_me />
              </Grid>
            );
          } else {
            return (
              <Grid
                key={p.id}
                onClick={() => {
                  history.push(`/cmt/${p.id}`);
                }}
              >
                <Card key={p.id} {...p} />
              </Grid>
            );
          }
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default MainPage;
