const { async } = require("@firebase/util");
const firebaseController = require("../controllers/firebaseController");
const app = require("express").Router();

async function GetPostsAndRender(res, name) {
  var posts = await firebaseController.database.read(`posts`);
  var postsArray = [];

  for (var i in posts) postsArray.push(posts[i]);

  if (postsArray.length == 0) posts = [];
  else posts = postsArray.filter((post) => post.category == name).reverse();

  res.render(name, { posts: posts.reverse() });
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/posts", async (req, res) => {
  var posts = await firebaseController.database.read(`posts`);
  var postsArray = [];

  for (var i in posts) postsArray.push(posts[i]);

  console.log(postsArray);

  if (postsArray.length == 0) res.render("todosposts", { posts: [] });
  else res.render("todosposts", { posts: postsArray.reverse() });
});

app.get("/natureza", async (req, res) => {
  GetPostsAndRender(res, "natureza");
});

app.get("/comida", async (req, res) => {
  GetPostsAndRender(res, "comida");
});

app.get("/diversao", async (req, res) => {
  GetPostsAndRender(res, "diversão");
});

app.get("/museu", async (req, res) => {
  GetPostsAndRender(res, "museu");
});

app.get("/turistico", async (req, res) => {
  GetPostsAndRender(res, "turistico");
});

app.get("/adm", (req, res) => {
  res.render("adm");
});

app.get("/adm1", async (req, res) => {
  var posts = await firebaseController.database.read(`posts`);
  var postsArray = [];

  for (var i in posts) postsArray.push(posts[i]);

  if (postsArray.length == 0) res.render("adm1", { posts: [] });
  else res.render("adm1", { posts: postsArray.reverse() });
});

app.get("/novopost", (req, res) => {
  res.render("novopost");
});

module.exports = app;
