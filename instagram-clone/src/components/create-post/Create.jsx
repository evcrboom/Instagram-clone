import React, { useState } from "react";
import "./Create.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function Create(props) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const location = useLocation();
  const  { username }  = location.state || 'Guest';

  function handleData(event){
    const {name, value, files} = event.target;
    if(name === "imagePost") {
      setImage(files[0]);
    } else {
      setText(value);
    }
  };
  
  function handleClose() {
    props.clicked();
  };

  async function createPost(event) {
    event.preventDefault();
    console.log(text);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('username', username)

    const response = await axios.post(`/upload-image`, formData);
    console.log(response.data);
    props.clicked(); //For closing CreatePost

  }

  return (
    <div className="create">
      <form action="" className="create__form" onSubmit={createPost}>
        <div className="create__header">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <label htmlFor="imageUpload">Upload image:</label>
        <input type="file" id="imageUpload" accept="image/png, image/jpeg" onChange={handleData} name="imagePost"/>
        <label htmlFor="textUpload">Description:</label>
        <input type="text" id="textUpload" placeholder="Type somethings..." value={text} onChange={handleData} name="textPost" />
        <button className="create__button" type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Create;
