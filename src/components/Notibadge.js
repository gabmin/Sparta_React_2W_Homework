import React from "react";
import { Badge } from "@mui/material";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);

  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.on("value", (snapshot) => {
      setIsRead(snapshot.val().read);
    });
    return () => notiDB.off();
  }, []);

  return (
    <React.Fragment>
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      ></Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};
export default NotiBadge;
