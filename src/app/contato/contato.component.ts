import { Component, OnInit } from '@angular/core';
import { contato } from './informacoes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  //listar, criar, editar e excluir

  contatos:contato[];
  esconder:boolean;

  constructor() {

    this.esconder=true;

    this.contatos = [
      {
        nome: "lucas",
        sobrenome : "reis",
        empresa : "cefet",
        cargo : "estudante",
        apelido : "lolo",
        aniversario : 26011995,
        observacao : "gosta de cafe",
        telefone : [3333333333,4444556671],
        endereco : "ruabairrocidade",
        email : ["aaaa@email.com","bbbb@email.com"]
      },
      {
        nome : "pedro",
        sobrenome : "cardoso",
        empresa : "cafca",
        cargo : "gerente",
        apelido : "pepe",
        aniversario : 11072002,
        observacao : "trabalhador",
        telefone : [1010101010,9544783215],
        endereco : "cidadebairro-rua",
        email : ["asdaw@email.com","sade@email.com"]
      }
    ];

  }

  public getContatos(){
    return this.contatos;
  }

  public mostrar(){
    this.esconder=!this.esconder;
  }

  ngOnInit(): void {
  }

}
