const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
  },
  {
    id: 2,
    name: "John Does",
    email: "johndoes@example.com",
    password: "password1",
  },
  {
    id: 3,
    name: "John Did",
    email: "johndid@example.com",
    password: "password12",
  },
];

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (user) => user.email === username && user.password === password
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect username or password" });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Passport.js Authentication" });
});

// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;

//   let user = users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (user === undefined) {
//     res.status(401).send("User not found");
//   } else {
//     res.status(200).json(user);
//   }
// });

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/failure",
  })
);

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({
        message: `Welcome ${req.user.name} to Passport.js Authentication`,
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/failure", (req, res) => {
  return res.status(401).json({ message: "Unauthorized" });
});

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
