const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'.env'});

app.get("/", (req, res) => {
    res.send("app is running...");
})

app.listen(process.env.PORT_SET, () =>{
    console.log(`htts://localhost:${process.env.PORT_SET}`)
} )