import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  
  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {}


  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre: nombre} )
              .map( (resp: any) => {
                swal('Hospital creado', nombre, 'success' );
                return resp.hospital;
              });
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
                .map( (resp: any) => {
                  swal('Hospital actualizado', resp.hospital.nombre, 'success' );
                  return resp.hospital;
                });

  }
 
  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
                    .map((resp: any)=>resp.hospital);
  }

  buscarHospitales( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.hospitales );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
                  return true;
                });

  }

}
