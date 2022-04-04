import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  //listar, criar, editar e excluir

  nome:string;
  sobrenome: string;
  empresa: string;
  cargo: string;
  apelido: string;
  aniversario: number;
  observacao: string;
  telefone: number; //transformar em vetor
  endereco: string;
  email: string; //transformar em vetor

  constructor() {

    this.nome = "lucas";
    this.sobrenome = "reis";
    this.empresa = "cefet";
    this.cargo = "estudante";
    this.apelido = "lolo";
    this.aniversario = 26011995;
    this.observacao = "gosta de cafe";
    this.telefone = 3333333333;
    this.endereco = "ruabairrocidade";
    this.email = "aaaa@email.com";

  }

  public getNome():string{
    return this.nome;
  }

  public getSobrenome():string{
    return this.sobrenome;
  }

  public getEmpresa():string{
    return this.empresa;
  }

  public getCargo():string{
    return this.cargo;
  }

  public getApelido():string{
    return this.apelido;
  }

  public getAniversario():number{
    return this.aniversario;
  }

  public getObservacao():string{
    return this.observacao;
  }

  public getTelefone():number{
    return this.telefone;
  }

  public getEndereco():string{
    return this.endereco;
  }

  public getEmail():string{
    return this.email;
  }

  ngOnInit(): void {
  }

}
