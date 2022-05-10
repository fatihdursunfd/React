const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors")

app.use(express.json());
app.use(cors())

const users = [
  {
    id: "1",
    username: "fatih",
    password: "fatih123",
    isAdmin: true,
  },
  {
    id: "2",
    username: "kadir",
    password: "kd61",
    isAdmin: false,
  },
];

let refreshTokens = [];

//  generate new access token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", { expiresIn: "120s" });
};
  
//  generate new refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

// verify access token
const verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } 
    else {
      res.status(401).json("You are not authenticated!");
    }
};

// refresh access token usinh refresh token
app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

});

// login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    //Generate an access and refresh token 
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } 
  else{
    res.status(400).json("Username or password incorrect!");
  }
});

// get user by id
app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

// logout
app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});


app.listen(5000, () => console.log("Backend server is running!"));