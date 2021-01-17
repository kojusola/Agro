require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("express-handlebars");
const flash = require("connect-flash")
const fs = require('fs')
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);


const app = express();

app.use(express.json());
// authentication and authorization with passport

app.use(
	session({
	  secret:"SECRET",
	  resave: false,
	  saveUninitialized: false,
	  cookie: { secure: false },
	  store: new MongoStore({
		mongooseConnection: mongoose.connection,
	  }),
	})
  );

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//import routes
const authRouter = require("./routes/authRouter")
const profileRouter = require("./routes/profileRouter")


app.use('/auth', authRouter)
app.use('/profile', profileRouter)


//database connection
const db = require("./connection")
db.db()

//middlewares
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/')));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


//view engine setup
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");






app.listen(process.env.PORT || 3000, () => {
    console.log("server has started")
})