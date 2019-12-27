
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Articulo } from 'src/app/interfaces/articulo';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
})
export class DialogBoxComponent {

  action: string;
  datos: any;
  listaTipo = ['Electrodomesticos', 'Mercado', 'Aseo', 'Salud y Belleza', 'Hogar', 'Jugueteria'];
  constructor( public dialogRef: MatDialogRef<DialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: Articulo) {
    dialogRef.disableClose = true;
    this.datos = {...data};
    this.action = this.datos.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.datos});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
