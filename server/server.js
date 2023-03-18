const express = require("express");
const morgan = require("morgan");
const {
  getFurniture,
  postItems,
  updateItem,
  deleteItem,
} = require("./handlers");

const app = express();
const server = require("http").createServer(app);

const PORT = 4000;

app
  .use(express.json())
  .use(morgan("dev"))

  .get("/items", getFurniture)
  .post("/description", postItems)
  .patch("/update/:_id", updateItem)
  .delete("/delete/:_id", deleteItem)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
