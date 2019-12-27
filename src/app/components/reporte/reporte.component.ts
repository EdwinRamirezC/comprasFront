import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
})
export class ReporteComponent implements OnInit {

  errors = null;
  fechaIni = '2019-08-01';
  fechaFin = '2019-12-31';
  tecnico = '';
  cliente = '';
  session = JSON.parse(sessionStorage.getItem('usuario'));
  reporte: any = {};

  constructor(private router: Router, private reportesService: ReportesService) {
    // se verifica si el usuario esta autenticado
    if (this.session) {
      (this.session.usuario) ? '' : this.router.navigate(['']) ;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  generarReporte() {
    const criterio = {
      fechaIni: this.fechaIni,
      fechaFin: this.fechaFin,
      tecnico: this.tecnico,
      cliente: this.cliente,

    };
    this.reportesService.generarReporte(criterio).subscribe( data => {
      this.reporte = data;
    });

  }

}
