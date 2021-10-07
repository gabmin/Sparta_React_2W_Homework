import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Likes = () => {
  return (
    <React.Fragment>
      <IconButton aria-label="delete">
        <FavoriteIcon />
      </IconButton>
    </React.Fragment>
  );
};

Likes.defaultProps = {
  is_like: false,
};
export default Likes;
