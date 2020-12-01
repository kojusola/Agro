const mongoose = require("mongoose")


exports.db = () => {
    mongoose.connect("mongodb://localhost/agro", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if(!err){
            console.log("Connection to database successful")
        }else{
            console.log("ERROR", err)
        }
})}