import { Component } from '@angular/core';
import { ContatoDataService } from './services/contato-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contatos:any;

  constructor(private _service:ContatoDataService){

  }

  ngOnInit(){
    this._service.getContatos().subscribe((res: any)=>{
      this.contatos = res;
    });
  }

}
