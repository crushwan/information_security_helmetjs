const express = require("express");
const app = express();
var helmet = require("helmet");

app.use(helmet());
app.use(helmet.hidePoweredBy());

// Latest helmet.js
// app.use(
//   helmet({
//     xPoweredBy: false,
//   })
// );

app.use(helmet.frameguard({ action: "deny" }));

// Latest helmet.js
// app.use(
//   helmet({
//     xFrameOptions: { action: "deny" },
//   })
// );

app.use(helmet.xssFilter());

// Latest helmet.js
// app.use(
//   helmet({
//     xXssProtection: true,
//   })
// );

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

app.use(helmet.dnsPrefetchControl());

app.use(helmet.noCache());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
