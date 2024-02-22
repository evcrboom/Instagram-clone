import React from "react";
import "./Sidenav.css";
import InstagramLogo from "../../assets/images/Instagram logo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Avatar from "@mui/material/Avatar";
import { useLocation } from 'react-router-dom';

function Sidenav() {
  const location = useLocation();
  const  { username }  = location.state || 'Guest';
  return (
    <div className="sidenav">
      <img className="sidenav__logo" src={InstagramLogo} alt="instagram-logo" />
      <div className="sidenav__buttons">
        <button className="sidenav__button">
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className="sidenav__button">
          <SearchIcon />
          <span>Search</span>
        </button>
        <button className="sidenav__button">
          <ExploreOutlinedIcon />
          <span>Explore</span>
        </button>
        <button className="sidenav__button">
          <SlideshowIcon />
          <span>Reels</span>
        </button>
        <button className="sidenav__button">
          <SmsOutlinedIcon />
          <span>Messages</span>
        </button>
        <button className="sidenav__button">
          <FavoriteBorderOutlinedIcon />
          <span>Notifications</span>
        </button>
        <button className="sidenav__button">
          <AddBoxOutlinedIcon />
          <span>Create</span>
        </button>
      </div>
      <div className="sidenav__more">
      <button className="sidenav__button">
          <Avatar> {username.charAt(0).toUpperCase()} </Avatar>
          <span>{username}</span>
        </button>       
        <button className="sidenav__button">
          <MenuOutlinedIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
