const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use((req, res, next) => {
//   console.log("Hi, I am 1st middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Hi, I am 2nd middleware");
//   next();
// });

// app.use((req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

// app.use("/random", (req, res, next) => {
//   console.log("I am only for random");
//   next();
// });

const checkTokens = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  } else {
    throw new ExpressError(401, "ACCESS DENIED!");
  }
};

app.get("/api", checkTokens, (req, res) => {
  res.send("data");
});

app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is Forbidden");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});

// app.use((err, req, res, next) => {
//   console.log("---Error2---");
//   next(err);
// });

app.get("/", (req, res) => {
  res.send("Hi i am root.");
});

app.get("/random", (req, res) => {
  res.send("this is a random page");
});

// app.use((req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

//404
// app.use((req, res) => {
//   res.status(404).send("page not found!");
// });
app.listen(8080, () => {
  console.log("server listening to port 8080");
});
