import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Orden } from 'src/app/interfaces/orden';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Articulo } from 'src/app/interfaces/articulo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
})
export class OrdenComponent implements OnInit {

  orden: Orden = {
    id : null,
    orden : null,
    cliente : null,
    nombre : null,
    usuario_id : null,
    articulos: [],
    usuario : {nombre : null},
  };
  session = JSON.parse(sessionStorage.getItem('usuario'));
  formulario: FormGroup;
  errors = null;
  // Se inicializan los objetos que se van a utilizar
  constructor(
              private activatedRoute: ActivatedRoute,
              private ordenesService: OrdenesService,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              private router: Router
   ) {
    // se verifica si el usuario esta autenticado
    if (this.session) {
      (this.session.usuario) ? '' : this.router.navigate(['']) ;
    } else {
      this.router.navigate(['']);
    }
    //  se crea el formulario que contiene los controles html
    this.formulario = formBuilder.group({
      orden: [ this.orden.orden, Validators.required],
      nombre_tecnico: [this.session.nombre, Validators.required],
      cliente: [this.orden.cliente, Validators.required],
      nombre : [this.orden.nombre, Validators.required]
    });
  }
  ngOnInit() {
    // se recibe la orden enviada por parametros
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.ordenesService.buscarOrden(params.id).subscribe((data: Orden) => {
          this.orden = data;
          // se inicializa el formulario para ser modificado
          this.formulario.controls.orden.setValue(this.orden.orden);
          this.formulario.controls.nombre_tecnico.setValue(this.orden.usuario.nombre);
          this.formulario.controls.cliente.setValue(this.orden.cliente);
          this.formulario.controls.nombre.setValue(this.orden.nombre);
        });
      } else {
        // en caso tal de que se vaya a ingresar un nuevo registro se utilizan los datos del tecnico logeado
        this.orden.usuario_id = this.session.id;
        this.orden.nombre = this.session.nombre;
      }
    });
  }

  // metodo usado para guardar la informacion en la base de datos
  guardar() {
    // se recuperan los valores de los formularios
    this.orden.orden = this.formulario.get('orden').value;
    this.orden.cliente = this.formulario.get('cliente').value;
    this.orden.nombre = this.formulario.get('nombre').value;
    // // se guarda la informacion
    this.ordenesService.guardar(this.orden).subscribe((data: Orden) => {
      if (data['guardado']) {
        this.router.navigate(['/ordenes']);
      } else {
        this.errors = data['mensaje'];
      }
    }, (error) => {
      this.errors = 'ocurrio un error al guardar en la base de datos';
    });
  }

  // metodo usado para editar la informacion de los articulos
  editarArticulo(datos, posicion: number) {
    const articulo: Articulo = {
      sku : datos.sku,
      nombreArticulo: datos.nombreArticulo,
      tipo: datos.tipo
    };
    this.orden.articulos[posicion] = articulo;
  }
  // metodo usado para borrar la informacion de los articulos
  borrarArticulo( posicion) {
    this.orden.articulos.splice(posicion, 1);
  }
  // metodo usado para agregar articulos
  agregarArticulo(datos) {
    const articulo: Articulo = {
      sku : datos.sku,
      nombreArticulo: datos.nombreArticulo,
      tipo: datos.tipo
    };
    this.orden.articulos.push(articulo);
  }
  // modal utilizado para ingresar la informacion de los articulos
  abrirDialogo(accion, posicion = null) {
    const datos = (this.orden.articulos[posicion])
      ? {...this.orden.articulos[posicion], action : accion, position: posicion }
      : {nombreArticulo: null, tipo: null, sku: null, action : accion , position: posicion};
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: datos
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.agregarArticulo(result.data);
      } else if (result.event == 'Update') {
        this.editarArticulo(result.data, result.data.position);
      } else if (result.event == 'Delete') {
        this.borrarArticulo(result.data.position);
      }
    });
  }
}
