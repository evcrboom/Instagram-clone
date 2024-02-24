import React, { useState, useEffect } from "react";
import "./Timeline.css";
import Suggestions from "./Suggestions";
import Post from "./Post";
import axios from "axios";

function Timeline() {
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    const response = await axios.get("/timeline")
    setPosts(response.data.post)

  };

  useEffect(()=>{
    getData(); 
  },[posts])

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__posts">
          {posts.map((post,index) => {
            return (
              <Post
                key={index}
                user={post.user}
                postImage={post.postImage}
                likes={post.likes}
                timestamp={post.timestamp}
              />
            );
          })}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>
    </div>
  );
}

export default Timeline;
