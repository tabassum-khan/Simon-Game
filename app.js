const express = require('express');

const app = express();

//serving static files
app.use(express.static("./public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 8080;

//setting up server to listen to the port
let server = app.listen(PORT, function(){
    let current_port = server.address().port;
    console.log("Server running on port " + current_port + "...");
});