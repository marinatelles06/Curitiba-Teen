// const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const express = require("express");
const bodyParser = require("body-parser");

function initMiddleWareController(app) {
  // app.use(helmet());

  //   app.use(
  //     rateLimit({
  //       windowMs: 5 * 60 * 1000,
  //       max: 200,
  //       message: "Too many requests, please try again later",
  //     })
  //   );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    const error = new Error("Not found");

    console.log(
      `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${
        req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress
      }]`
    );

    res.on("finish", () => {
      console.log(
        `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${
          req.statusCode
        }] - IP: [${
          req.headers["cf-connecting-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress
        }]`
      );
    });

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "POST, GET");
      return res.status(200).json({});
    }

    if (res.status == 404) {
      res.json({
        message: error.message,
      });
    }
    next();
  });

  app.use(express.static("public"));
  app.set('view engine', 'ejs');
  app.set("views", "pages");
}

module.exports = initMiddleWareController;
