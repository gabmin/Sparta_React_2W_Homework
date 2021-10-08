import React from "react";
import { Grid } from "@mui/material";
import Text from "../elements/Text";
import Image from "../elements/Image";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";
import { history } from "../redux/confingStore";

const Notification = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);
  React.useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      <Grid padding="16px" backgroundColor="#ffffff">
        {noti.map((n, idx) => {
          return (
            <Grid
              margin="10px 10px"
              display="flex"
              width="auto"
              backgroundColor="#00804514"
            >
              <Grid margin="10px">
                <Image
                  key={`noti_${idx}`}
                  shape="square"
                  size="70"
                  src={n.image_url}
                ></Image>
              </Grid>
              <Grid margin="auto 10px">
                <Text size="15px">
                  <b key={`noti_${idx}`}>{n.user_name}</b>님이 게시글에 댓글을
                  남겼습니다!!
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
