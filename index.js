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
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")
const fileUpload = require("express-fileupload")
const MongoStore = require("connect-mongo")(session);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_KEY);
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const favicon = require('serve-favicon')


const app = express();


// authentication and authorization with passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public/')))



app.use(favicon(__dirname + '/favicon.ico'));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(cookieParser());
app.use(
	session({
	//   secret: process.env.SESSION_SECRET,
	  secret: 'secret',
	  resave: false,
	  saveUninitialized: false,
	  cookie: { secure: false, maxAge: 3600000 },
	  store: new MongoStore({
		mongooseConnection: mongoose.connection,
	  }),
	})
  );
// app.use(favicon(__dirname + '/favicon.ico'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.get("/contactus", async (req, res) => {
	return res.render("contactus.hbs")
})
app.post("/contactus", async (req, res) => {
    const msg = {
		to: 'charlesugbana04@gmail.com',
    	from: 'developmenthub123@gmail.com',
    	subject: 'Someone reached out - AgroTech',
		html: `<h4>Hello admin,</h4>
		<p>You have a new message for an AgroTech user, <strong>${req.body.first_name} ${req.body.last_name}</strong></p> 
		<p> Phone: ${req.body.phone}</p>
		<p> Phone: ${req.body.email}</p>
		<p> Message: ${req.body.message}</p>
		`
	};
		sgMail.send(msg).then(() => {
			req.flash("success", "Message sent successfully!")
			res.redirect("/")
		}).catch(error => {
			req.flash("error", "Something went wrong. Please try again!")
			res.redirect("/")
		})
	})


//import routes

const profileRouter = require("./routes/profileRouter")
const farmerRouter = require("./routes/farmerRouter")
const landRouter = require("./routes/landingPageRouter")
const authRouter = require("./routes/authRouter")
const livechatRouter = require("./routes/liveChatRouter")
const adminRouter = require("./routes/adminRouter")

app.use('/',landRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/farmers', farmerRouter)
app.use('/livechat', livechatRouter)
app.use('/admin', adminRouter)

app.all("*", async (req, res, next) => {
	req.flash("error", "Url does not exist!!!")
	res.redirect('/')
})
//database connection
const db = require("./connection");
db.db()






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