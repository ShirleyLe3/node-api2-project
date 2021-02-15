const express = require("express");
const router = require("./users/express-router");
const server = express();
const port = 4000;

server.use(express.json());
server.use("/api/posts", router);

//      Setting up API
server.get("/", (req, res) => {
  res.status(200).send("Welcome to World of Back-end");
  console.log(req);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
