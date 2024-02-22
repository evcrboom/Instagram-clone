import React, { useState } from "react";
import "./Timeline.css";
import Suggestions from "./Suggestions";
import Post from "./Post";

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "boombabies",
      postImage:
        "https://res09.bignox.com/moniqi-blog/th-bignox-blog/2023/06/%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99-browndust2-%E0%B8%9F%E0%B8%A3%E0%B8%B5%E0%B8%9A%E0%B8%99-pc-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-NOXPLAYER-%E0%B8%88%E0%B8%AD%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%88%E0%B9%8B%E0%B8%87_gift-code.jpg",
      likes: 122,
      timestamp: "2d",
    },
    {
      user: "mimu.p",
      postImage: "https://www.findme.ac.th/uploads/contents/20170225163141.jpg",
      likes: 2567,
      timestamp: "1d",
    },
    {
      user: "boombabies",
      postImage:
        "https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D191407398W10000H7295/views/1,width=1200,height=630,appearanceId=839,backgroundColor=F2F2F2/boombaby-springsummer-2021bb-sticker.jpg",
      likes: 122,
      timestamp: "2w",
    },
    {
      user: "John Sena",
      postImage:
        "https://www.wrestlinginc.com/img/gallery/wwe-star-john-cena-shares-cryptic-image-on-instagram-fans-speculate-on-meaning/intro-1699556738.jpg",
      likes: 142,
      timestamp: "12h",
    },
  ]);
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
