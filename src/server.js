var express = require("express");

var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var contatoAPI = require("./controllers/contato.controller");
app.use("/api/contatos",contatoAPI);

app.listen(8080);
console.log("server up running on port 8080");
