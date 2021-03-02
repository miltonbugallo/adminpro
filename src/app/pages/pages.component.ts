import { Component, OnInit } from '@angular/core';

declare function init_plugin(); // Declaro que esa funcion si existe para que no de error de que no la encuentra
//De esta forma se llaman cualquier script fuera de angular.

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     init_plugin();
  }

}
