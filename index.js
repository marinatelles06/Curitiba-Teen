const initMiddleWareController = require("./controllers/middlewareController");

const express = require("express");
const app = express();

initMiddleWareController(app);

app.use("/", require("./routes/default"));
app.use("/posts", require("./routes/posts"));

app.listen(3000, () => {
  console.log("Server running in http://localhost:3000");
});
