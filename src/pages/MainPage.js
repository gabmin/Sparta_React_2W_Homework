import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import { actionCreators as postActions } from "../redux/modules/Post";

const MainPage = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        if (p.user_info.user_id === user_info?.uid) {
          return <Card key={p.id} {...p} is_me />;
        } else {
          return <Card key={p.id} {...p} />;
        }
      })}
    </React.Fragment>
  );
};

export default MainPage;
