const dotenv = require("dotenv");
dotenv.config()

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const path = require("path");

const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const connectDB = require("./utils/connect");
const { local } = require("./auth");

const PORT = process.env.PORT ?? 3000;
const SECRET = process.env.SECRET ?? "AStrongSecret";

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cookieParser(SECRET));
    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: SECRET,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/static", express.static(path.join(__dirname, "./public")));

    // Serialize-Deserialize

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });

    passport.use("local", local);

    app.get("/", (req, resp) => {
      resp.send("Welcome to Book Management APIs");
    });

    app.use("/auth", authRouter);
    app.use("/book", bookRouter);
    app.use("/user", userRouter);

    app.use("*", (req, resp) => {
      resp.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    });

    app.use((err, req, resp, next) => {
      console.log(err);
      resp
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err?.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
    });

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting. Reason: ${err.message}`);
  });
