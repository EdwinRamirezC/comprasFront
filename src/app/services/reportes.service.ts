import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private httpClient: HttpClient) { }

  generarReporte(criterio: any) {
    const cabeceras = new HttpHeaders({'Content-Type': 'application/json'});
    const url = API_ENDPOINT + 'orden/reporte';
    return this.httpClient.post(url, criterio, {headers: cabeceras});
  }

}
