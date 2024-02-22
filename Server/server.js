import express, { json, urlencoded } from "express";
import pool from "./db.js"; //Setting your Database before running in your local environtment.
import bcrypt from "bcrypt";

const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function hashPassword(password) {
  const saltRounds = 10;
  const hasedhPassword = await bcrypt.hash(password, saltRounds);
  return hasedhPassword;
}

async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

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

app.post ("/test", (req, res) => {
 const {username, password} = req.body;
 console.log(username, password);
 res.json({success: true});
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});


