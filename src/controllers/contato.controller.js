var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

//consulta todos os contatos
router.get("/todosOsContatos",(req,res)=>{
  connection.query(" select contato.*, group_concat(distinct(telefones.telefone) separator ',') as 'telefone', group_concat(distinct(emails.email) separator ',') as 'email' from ((contato inner join telefones on contato.nome = telefones.nome and contato.sobrenome = telefones.sobrenome) inner join emails on emails.nome = contato.nome and emails.sobrenome = contato.sobrenome)",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})


//consulta todos os dados de um mesmo contato
router.get("/buscaContato/:nome/:sobrenome",(req,res)=>{
  connection.query(" select contato.*, group_concat(distinct(telefones.telefone) separator ',') as 'telefone', group_concat(distinct(emails.email) separator ',') as 'email' from ((contato inner join telefones on contato.nome = telefones.nome and contato.sobrenome = telefones.sobrenome) inner join emails on emails.nome = contato.nome and emails.sobrenome = contato.sobrenome) where contato.nome='"+req.params.nome+"' and contato.sobrenome='"+req.params.sobrenome+"'",(err,records,fields)=>{
    if(err){
      console.error("Error while fetching data");
    }else{
      res.send(records);
    }
  })
})

//salva contato com telefone (preencher o telefone é obrigatório)
router.post("/inserirContato",(req,res)=>{
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var empresa = req.body.empresa;
  var cargo = req.body.cargo;
  var apelido = req.body.apelido;
  var aniversario = req.body.aniversario;
  var observacao = req.body.observacao;
  var endereco = req.body.endereco;
  var telefone = req.body.telefone;

  connection.query("insert into contato values ('"+nome+"','"+sobrenome+"','"+empresa+"','"+cargo+"','"+apelido+"',"+aniversario+", '"+observacao+"', '"+endereco+"')",
  (err,result)=>{
    if(err){
      console.error("Error while inserting contato");
    }else{
      res.send({insert:"success contato"});
    }
  })

  connection.query("insert into telefones values ('"+nome+"','"+sobrenome+"',"+telefone+")",
  (err,result)=>{
    if(err){
      console.error("Error while inserting telefone");
    }else{
      res.send({insert:"success saving telefone"});
    }
  })

})


//salva email do contato
router.post("/inserirEmail",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var email = req.body.email;

  connection.query("insert into emails values ('"+nome+"','"+sobrenome+"','"+email+"') ",
  (err,result)=>{
    if(err){
      console.error("Error while inserting email");
    }else{
      res.send({insert:"success saving email"});
    }
  })
})

module.exports = router;
