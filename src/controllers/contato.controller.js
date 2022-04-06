var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

router.get("/contato",(req,res)=>{
  connection.query("select * from contato",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})

router.get("/telefones",(req,res)=>{
  connection.query("select * from telefones",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})

router.get("/emails",(req,res)=>{
  connection.query("select * from emails",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})

router.get("/buscacontato/:nome/:sobrenome",(req,res)=>{
  connection.query("select * from contato where nome='"+req.params.nome+"' and sobrenome='"+req.params.sobrenome+"'",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})

module.exports = router;
