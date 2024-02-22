import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import TelegramIcon from '@mui/icons-material/Telegram';
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

function Post(props) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Avatar>{props.user.charAt(0).toUpperCase()}</Avatar>
          {props.user} • <span>{props.timestamp}</span>
        </div>
        <div className="post__more">
          <MoreHorizIcon />
        </div>
      </div>
      <div className="post__image">
        <img
          src={props.postImage}
          alt="post"
        />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
            <FavoriteBorderOutlinedIcon className="postIcon" />
            <ModeCommentOutlinedIcon className="postIcon" />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconsSave">
            <TurnedInNotOutlinedIcon className="postIcon" />
          </div>
        </div>
        Liked by {props.likes} peoples.
      </div>
    </div>
  );
}

export default Post;
