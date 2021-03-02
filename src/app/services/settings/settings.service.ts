import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {this.cargarAjuste(); /* Se ejecuta al cargar la pagina */}

  guardarAjuste(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes)); //Guarda con el nombre ajustes el objeto ajustes convertido en string
  }

  cargarAjuste(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes')); //Cargo del localStorage la info y convierto en objeto
      this.aplicarAjuste(this.ajustes.tema);
    } else {
      this.aplicarAjuste(this.ajustes.tema);
    }
  }

  aplicarAjuste(tema: string){
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('temaIndex').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjuste();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
