const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
dotenv.config({ path: "./.env.private" });

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const { DBURL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(
    DBURL,
    {
      useMongoClient: true
    }
  )
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
var whitelist = ["https://vetmngr.herokuapp.com", "http://localhost:4200"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.use(
  session({
    secret: "angular auth passport secret shh",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 2419200000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
require("./passport")(app);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const authRouter = require("./routes/auth");
const appointmensRouter = require("./routes/appointments");
const petsRouter = require("./routes/pets");
const customersRouter = require("./routes/customers");
const staffRouter = require("./routes/staff");
app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmensRouter);
app.use("/api/pets", petsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/staff", staffRouter);
app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
module.exports = app;
