const express = require("express");
const dealRoutes = require("./routes/deals");
const path = require("path");
const multer = require("multer");
const csrf = require("csurf");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");

const User = require("./models/user");

const sequelize = require("./data/database");
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const errorController = require("./controllers/errorController");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");

const apiBlogRoutes = require("./api/routes/blog");
const apiDealRoutes = require("./api/routes/deals");
const apiOrderRoutes = require("./api/routes/orders");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders: "*",
  })
);

app.options("*", cors());
const store = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "project0",
});
app.use(cookieParser());
const csrfProtection = csrf({
  cookie: true,
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "MutethiaMutembei",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use("/api/orders", apiOrderRoutes);

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.get("/api/token", (req, res) => {
  const csrfToken = req.csrfToken();
  res.status(201).json({ csrfToken });
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/admin", adminRoutes);
app.use("/deal", dealRoutes);
app.use("/blog", blogRoutes);
app.use("/auth", authRoutes);
app.use(shopRoutes);

//api endpoints

app.use("/api/deals", apiDealRoutes);
app.use("/api/blogs", apiBlogRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

app.use(errorController.get404);

const connectToDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();
