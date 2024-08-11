const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

   mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.vthtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
   useNewUrlparser :true,
   useUnifiedTopology : true,
   })

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const Registration = mongoose.model("Resistration", registrationSchema);
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/page/index.html");
})

app.post("/register",async(req, res) => { 
    try{
        const {name, email, password} = req.body;

        const registrationData = new Resistration({
            name,
            email,
            password,

        });
       await registrationData.save();
       res.redirect("/success")

      }
    catch (error){
        console.log(error);
        res.redirect("error");
    }
})

        app.get("/success",(req, res)=>{
            res.sendFile(__diname +"/page/success.html");
        })
        app.get("error",(req, res)=>{
            res.sendFile(__diname +"/page/error.html");

        })
        

    


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})