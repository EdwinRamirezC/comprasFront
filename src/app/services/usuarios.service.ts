import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from '../constantes/constantes';
import { Log } from 'src/app/interfaces/log';
import { Usuarios } from '../interfaces/usuarios';
// import {  } from "src/app/interfaces/log";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  consultarUsuario(log: Log){
    const cabeceras = new HttpHeaders({'Content-Type': 'application/json'});
    const url = API_ENDPOINT + 'usuario/login';
    return this.httpClient.post(url, log , {headers: cabeceras});
  }

  guardarUsuario(usuario: Usuarios) {
    const cabeceras = new HttpHeaders({'Content-Type': 'application/json'});
    const url = API_ENDPOINT + 'usuario';
    return this.httpClient.post(url, usuario , {headers: cabeceras});
  }
}
