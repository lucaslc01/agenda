var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

//consulta todos os contatos
router.get("/todosOsContatos",(req,res)=>{
  connection.query(" select contato.*, group_concat(distinct(telefones.telefone) separator ',') as 'telefone', group_concat(distinct(emails.email) separator ',') as 'email' from ((contato inner join telefones on contato.nome = telefones.nome and contato.sobrenome = telefones.sobrenome) inner join emails on emails.nome = contato.nome and emails.sobrenome = contato.sobrenome) group by contato.nome, contato.sobrenome",(err,records,fields)=>{
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

//salva contato com telefone e email (preencher o telefone e email é obrigatório)
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
  var email = req.body.email;

  connection.query("insert into contato values ('"+nome+"','"+sobrenome+"','"+empresa+"','"+cargo+"','"+apelido+"',"+aniversario+", '"+observacao+"', '"+endereco+"')",
  (err,result)=>{
    if(err){
      console.error("Error while inserting contato");
    }
  })

  connection.query("insert into telefones values ('"+nome+"','"+sobrenome+"',"+telefone+")",
  (err,result)=>{
    if(err){
      console.error("Error while inserting telefone");
    }
  })

  connection.query("insert into emails values ('"+nome+"','"+sobrenome+"','"+email+"') ",
  (err,result)=>{
    if(err){
      console.error("Error while inserting email");
    }else{
      res.send({insert:"success saving contato, telefone and email"});
    }
  })

})

router.post("/adicionarTelefone",(req,res)=>{
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var telefone = req.body.telefone;

  connection.query("insert into telefones values ('"+nome+"','"+sobrenome+"',"+telefone+")",
  (err,result)=>{
    if(err){
      console.error("Error while adding new telefone");
    }else{
      res.send({insert:"success adding telefone"});
    }
  })

})

router.post("/adicionarEmail",(req,res)=>{
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var email = req.body.email;

  connection.query("insert into emails values ('"+nome+"','"+sobrenome+"','"+email+"')",
  (err,result)=>{
    if(err){
      console.error("Error while adding new email");
    }else{
      res.send({insert:"success adding email"});
    }
  })

})

// todos os puts alteram dados
router.put("/alterarEmpresa",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var empresa = req.body.empresa;

  connection.query("update contato set empresa='"+empresa+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating empresa");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarCargo",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var cargo = req.body.cargo;

  connection.query("update contato set cargo='"+cargo+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating cargo");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarApelido",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var apelido = req.body.apelido;

  connection.query("update contato set apelido='"+apelido+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating apelido");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarAniversario",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var aniversario = req.body.aniversario;

  connection.query("update contato set aniversario="+aniversario+" where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating aniversario");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarObservacao",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var observacao = req.body.observacao;

  connection.query("update contato set observacao='"+observacao+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating observacao");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarEndereco",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var endereco = req.body.endereco;

  connection.query("update contato set endereco='"+endereco+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating endereco");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarTelefone",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var telefone = req.body.telefone;
  var email = req.body.email;

  connection.query("update telefones set telefone="+telefone+" where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating telefone");
    }else{
      res.send({update:"success"});
    }
  })
})

router.put("/alterarEmail",(req,res)=>{

  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var email = req.body.email;

  connection.query("update emails set email='"+email+"' where nome='"+nome+"' and sobrenome='"+sobrenome+"'",
    (err,result)=>{
    if(err){
      console.error("Error while updating email");
    }else{
      res.send({update:"success"});
    }
  })
})

module.exports = router;
