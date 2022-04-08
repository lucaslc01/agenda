import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {

  constructor(private _httpClient:HttpClient) { }

  public getContatos():any{
    return this._httpClient.get('http://localhost:8080/api/contatos/todosOsContatos');
  }
}
