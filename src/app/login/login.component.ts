import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugin(); // Declaro que esa funcion si existe para que no de error de que no la encuentra
//De esta forma se llaman cualquier script fuera de angular.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_plugin();
  }

  ingresar(){
  this.router.navigate(["/dashboard"]);// Navegar hacia otra pagina
  }

}
