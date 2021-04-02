import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})

export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  
  ngOnInit() {
    this.cargarHospitales(); 

     this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() ); 
  }

  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.hospitales = resp.hospitales;
                this.cargando = false;

              });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
              .subscribe( () => this.cargarHospitales() );

    });

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
            .subscribe( (hospitales: Hospital[]) => {

              this.hospitales = hospitales;
              this.cargando = false;
            });

  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {

        this._hospitalService.borrarHospital( hospital._id )
                  .subscribe( borrado => {
                      this.cargarHospitales();
                  });

      }

    });

  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
            .subscribe();

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

} 
