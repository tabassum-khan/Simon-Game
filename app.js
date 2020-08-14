const express = require('express');

const app = express();

//serving static files
app.use(express.static("./public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.listen(8000, () => console.log("Server started on port 8000.."));