import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document, public _ajustes: SettingsService) { }


  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any){
    
    this.aplicarCheck(link);

    this._ajustes.aplicarAjuste(tema);

  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }
  
  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores){
      if(this._ajustes.ajustes.tema==ref.getAttribute('data-theme')){
        ref.classList.add('working');
        break;
      }
    }
  }

}
