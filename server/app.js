// const createError = require("http-errors");
const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const cookieSession = require("cookie-session");

const app = express();

const indexRouter = require("./routes/index");
const b12APIHardwareRouter = require("./routes/hardware-copy");
const b12APIWebRouter = require("./routes/b12-api-web");
const b12APIAuthRouter = require("./routes/b12-api-auth");

// 1000 = 1s.
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1", "key2"],
//     maxAge: 60000 * 1,
//   })
// );

// const isNotLogin = (req, res, next) => {
//   const { isLoggedIn } = req.session;
//   res.redirect("/");
//   next();
// };

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/", indexRouter);
app.use("/b12-api-hardware", b12APIHardwareRouter);
app.use("/b12-api-web", b12APIWebRouter);
app.use("/b12-api-auth", b12APIAuthRouter);

// app.get("*", isNotLogin, (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
