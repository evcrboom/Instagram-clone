import express, { json, urlencoded } from "express";
import pool from "./db.js"; //Setting your Database before running in your local environtment.
import bcrypt from "bcrypt";
import axios from "axios";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";

const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

async function hashPassword(password) {
  const saltRounds = 10;
  const hasedhPassword = await bcrypt.hash(password, saltRounds);
  return hasedhPassword;
}

async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

const post =  [{
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
}];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Input the username or password");
  }
  try {
    const dataUser = await pool.query(
      "SELECT hashed_password FROM user_identify WHERE username = $1",
      [username]
    );
    if (dataUser.rows.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Sorry, your username was incorrect. Please double-check your username.",
        });
    } else {
      const match = await checkPassword(
        password,
        dataUser.rows[0].hashed_password
      );
      if (match) {
        res.json({ success: true });
      } else {
        res
          .status(400)
          .json({
            success: false,
            error:
              "Sorry, your password was incorrect. Please double-check your password.",
          });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  try {
    const data = await pool.query(
      "SELECT username FROM user_identify WHERE username = $1",
      [username]
    );
    if (!username || !password) {
      res.status(400).json({success: false, error : "Input the username or password"});
    } else if (data.rows.length > 0) {
      res.status(400).json({success: false, error: "Username is already taken"});
    } else {
      const hashedPassword = await hashPassword(password);
      const result = await pool.query(
        "INSERT INTO user_identify (username, hashed_password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      );
      res.json({success:true, message: result.rows[0]});
    }
  } catch (err) {
    res.status(500).json({success: false , error: "Server Error Pls try again"});
    console.log(err);
  }
});

app.get ("/timeline", ( req , res ) => {
  res.json({post: post});
});

app.post ("/upload-image",upload.single('image'), async (req,res) =>{
  const { username } = req.body
  const file = req.file;

   const formData = new FormData();
     formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
     formData.append('source', fs.createReadStream(file.path));
     formData.append('format', 'json');
     try {
     const response = await axios.post('https://freeimage.host/api/1/upload',formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
     console.log(response.data.url);
     const newPost = { 
      user: username,
      postImage: response.data.image.url,
      likes: 0,
      timestamp: "now"
    }
    post.unshift(newPost);

     fs.unlink(req.file.path, (err) => {
      if (err) throw err;
      console.log('Temp file deleted');
    });

  res.json({status: "success"}) }
  catch(error) {
    res.status(500).json({ status: "server error"})
    console.log(error.response.data)
  }
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});


