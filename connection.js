const mongoose = require("mongoose")

mongoose.set('useCreateIndex', true);
exports.db = () => {
    mongoose.connect(process.env.DATABASE_CON, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false}, (err) => {
        if(!err){
            console.log("Connection to database successful")
        }else{
            console.log("ERROR", err)
        }
})}

// exports.db = () => {
//     mongoose.connect("mongodb://localhost/agro", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
//         if(!err){
//             console.log("Connection to database successful")
//         }else{
//             console.log("ERROR", err)
//         }
// })}