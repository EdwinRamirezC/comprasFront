import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import {  Router } from '@angular/router';
import { Orden } from 'src/app/interfaces/orden';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
})
export class OrdenesComponent implements OnInit {

  usuario: number;
  nombre: string;
  ordenes: Orden[];
  tecnico: string;
  session = JSON.parse(sessionStorage.getItem('usuario'));

  constructor(
    private ordenesService: OrdenesService,
    private router: Router
  ) {
    if (this.session) {
      (this.session.usuario) ? '' : this.router.navigate(['']) ;
    } else {
      this.router.navigate(['']);
    }
    // recuperar datos del session storage
    this.usuario = this.session.id;
    this.nombre = this.session.nombre;

    this.ordenesService.listarOrdenes(this.usuario).subscribe((data: Orden[]) => {
      this.ordenes = data;
    });
  }
  ngOnInit() {
  }

}
