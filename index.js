const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  axios
    .get(
      "https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md"
    )
    .then((response) => {
      const text = response.data;
      const parsed = text.replace(/## Table of contents[\s\S]+?(-----\s)/g, "");
      res.send(parsed);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
