import React, {useState} from "react";
import "./Homepage.css";
import Sidenav from "./navigation/Sidenav";
import Timeline from "./timeline/Timeline";
import Create from "./create-post/Create";

function Homepage() {
  const [clicked,setClicked] = useState(false);

  function handleClicked (){
    setClicked(!clicked);
  }

  return (
    <div className="homepage">
      <div className="homepage__nav">
        <Sidenav  clicked={()=>{ handleClicked() }} />
      </div>
        { clicked && <Create clicked={()=>{ handleClicked() }} />}
      <div className="homepage__timeline">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
