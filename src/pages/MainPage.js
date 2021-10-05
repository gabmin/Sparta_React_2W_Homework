import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import { actionCreators as postActions } from "../redux/modules/Post";

const MainPage = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const dispatch = useDispatch();

  console.log(post_list);

  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Card key={p.id} {...p} />;
      })}
    </React.Fragment>
  );
};

export default MainPage;
