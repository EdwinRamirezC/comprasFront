import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from '../constantes/constantes';
import { Orden } from '../interfaces/orden';




@Injectable({
  providedIn: 'root'
})
export class OrdenesService {


  constructor( private httpClient: HttpClient) { }

  guardar(orden: Orden) {
    const cabeceras = new HttpHeaders({'Content-Type': 'application/json'});
    const url = API_ENDPOINT + 'orden';
    return this.httpClient.post(url, orden, {headers: cabeceras});
  }

  listarOrdenes(id: number) {
    const url = API_ENDPOINT + 'orden/listar/' + id;
    return this.httpClient.get(url);
  }

  buscarOrden(id: number) {
    const url = API_ENDPOINT + 'orden/' + id;
    return this.httpClient.get(url);
  }
}
