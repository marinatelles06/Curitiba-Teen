const firebaseController = require("../controllers/firebaseController");
const app = require("express").Router();

app.post("/", async (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  firebaseController.database.update(`posts`, {
    [Date.now()]: { title, body, category, createdAt: Date.now() },
  });

  res.status(200).end();
});

app.delete("/:post", async (req, res) => {
  await firebaseController.database.set(`posts/${req.params.post}`, null);

  res.status(200).end();
});

module.exports = app;
