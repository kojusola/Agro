require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expbs = require("express-handlebars");
const Handlebars = require("handlebars");
const flash = require("connect-flash")
const fs = require('fs')
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const app = express();

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// authentication and authorization with passport

app.use(
	session({
	  secret: process.env.SESSION_SECRET,
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
const farmerRouter = require("./routes/farmerRouter")


app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/farmers', farmerRouter)


//database connection
const db = require("./connection");
const router = require('./routes/authRouter');
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
const hbs = expbs.create({
	extname: "hbs", 
	defaultLayout: "index", 
	layoutsDir: __dirname + "/views/layouts/",
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	helpers:{
		diff: function(a, b){
			return a - b
		},
		equal: function(a, b){
			return a === b
		},
		ifeq: function(arg1, arg2,options){
			return(arg1 == arg2) ? options.inverse(this): options.inverse(this);
		}
	}
});

// Handlebars.registerHelper('ifeq', function(arg1, arg2,options){
// 	return(arg1 == arg2) ? options.inverse(this): options.inverse(this);
// })

app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");




app.listen(process.env.PORT || 3000, () => {
    console.log("server has started")
});