import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Likes = (props) => {
  if (props.is_like) {
    return (
      <React.Fragment>
        <IconButton aria-label="delete" onClick={props.onClick}>
          <FavoriteIcon />
        </IconButton>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <IconButton aria-label="delete" onClick={props.onClick}>
          <FavoriteBorderIcon />
        </IconButton>
      </React.Fragment>
    );
  }
};

export default Likes;
