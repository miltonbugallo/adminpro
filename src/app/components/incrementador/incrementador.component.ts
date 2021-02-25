import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  @ViewChild('txtProgress') txtProgress: ElementRef;
  //Trabaja solo con el elemento al que hace referencia ese nombre asignado por nosotros

  @Input('tituloBarra') leyenda: string = 'Leyenda'; 
  // Con @Input traigo info de afuera, con el nombre entre () es con 
  // el que se asigna desde afuera y el de leyenda como la llamo en este componente
  @Input() progreso: number = 50;

  @Output() cambioValorBarra: EventEmitter<number> = new EventEmitter();
  // Declaracion del output con su tipo de valor que envia

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(newValue: number){
    
    //let elemtHTML: any = document.getElementsByName('progreso')[0];

    if(newValue >= 100){
      this.progreso = 100;
    } else if (newValue <= 0){
      this.progreso = 0;
    } else {
    this.progreso = newValue;
    }
    //elemtHTML.value=this.progreso;
    this.txtProgress.nativeElement.value=this.progreso;
    this.cambioValorBarra.emit(this.progreso);
  }
  
  cambiarValor(valor: number){

    if (this.progreso <= 5 && valor < 0){
      this.progreso = 0;
      return;
    }
    if (this.progreso >= 95 && valor > 0){
      this.progreso = 100;
      return;
    }

  this.progreso += valor;
 
  this.cambioValorBarra.emit(this.progreso);

  this.txtProgress.nativeElement.focus();
  //Hace focus en ese elemento, queda el cursor siempre ahi

  }

}
