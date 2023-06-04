var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GithubStrategy = require("passport-github2").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
var FacebookStrategy = require("passport-facebook").Strategy;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { Customer } = require("./models");

//cookie-sesion
// const cookieSession = require("cookie-session");
const session = require("express-session");
// Import JWT vs Passport
const passport = require("passport");
const { findDocument } = require("./helpers/MongoDbHelper");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtSettings = require("./constants/jwtSettings");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var suppliersRouter = require("./routes/suppliers");
var employeesRouter = require("./routes/employees");
var customersRouter = require("./routes/customers");
var ordersRouter = require("./routes/orders");
var guestServicesRouter = require("./routes/guestServices");
var uploadImageRouter = require("./routes/uploadImages");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   cookieSession({
//     name: "session_google_account",
//     keys: ["lama"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: "GET,POST,PATCH,DELETE,PUT",
    credentials: true,
  })
);
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1054091766203-a2lfqck9kfgs9ibskuludnbo47t9ko3n.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/customers/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("access token ", accessToken);
      console.log("refresh token ", refreshToken);
      console.log("profile", profile);

      //check whether this current user exists in our database
      const user = await Customer.findOne({
        authGoogleId: profile.id,
        accountType: "google",
      });
      if (user) return done(null, user);
      //else create a new user
      const googleAccount = {
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value,
        authGoogleId: profile.id,
        avatar: profile.photos[0].value,
      };
      const accountCustomer = new Customer(googleAccount);
      accountCustomer.save().then((user) => done(null, user));
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: "e986f82496ac0eab423a",
      clientSecret: "2e09476dfcae11af641b64522348030a3f5398dc",
      callbackURL: "/customers/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("access token ", accessToken);
      console.log("refresh token ", refreshToken);
      console.log("profile", profile);

      //check whether this current user exists in our database
      const user = await Customer.findOne({
        authGithub: profile.id,
        accountType: "github",
      });
      if (user) return done(null, user);
      //else create a new user
      const githubAccount = {
        firstName: "Unknown",
        lastName: profile.username,
        email: "githubkhongtraveemails@gmail.com",
        authGithub: profile.id,
        avatar: profile.photos[0].value,
      };
      const accountCustomer = new Customer(githubAccount);
      accountCustomer.save().then((user) => done(null, user));
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: "184166790921301",
      clientSecret: "f3c7e7fb54594fb9a3cdb22db9f6dd67",
      callbackURL: "/customers/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("access token ", accessToken);
      console.log("refresh token ", refreshToken);
      console.log("profile", profile);

      //check whether this current user exists in our database
      const user = await Customer.findOne({
        authFacebookId: profile.id,
        accountType: "facebook",
      });
      if (user) return done(null, user);
      //else create a new user
      const githubAccount = {
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: "toikhonglayduocgmails@gmail.com",
        authFacebookId: profile.id,
        avatar: profile.photos[0].value,
      };
      const accountCustomer = new Customer(githubAccount);
      accountCustomer.save().then((user) => done(null, user));
    }
  )
);
// use cookie-session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
//
// Passport: jwt
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSettings.SECRET;
opts.audience = jwtSettings.AUDIENCE;
opts.issuer = jwtSettings.ISSUER;

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const id = payload.sub;
    // console.log(payload);
    const found = await findDocument(id, "customers");
    // console.log(found);
    if (found && found.active) {
      //kiểm tra active trong DB true hay false
      let error = null;
      let user = true;
      return done(error, user);
    } else {
      let error = null;
      let user = false;
      return done(error, user);
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);
app.use("/employees", employeesRouter);
app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
app.use("/guestServices", guestServicesRouter);

/* Router Upload Image */
app.use("/upload-image", uploadImageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
