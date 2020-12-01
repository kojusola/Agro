const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("express-handlebars");
const app = express();


//database connection
const db = require("./connection")
db.db()

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


//view engine setup
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");






app.listen(process.env.PORT || 3000, () => {
    console.log("server has started")
})