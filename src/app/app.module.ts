import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { OrdenComponent } from './components/orden/orden.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuariosComponent,
    OrdenesComponent,
    OrdenComponent,
    DialogBoxComponent,
    LoguinComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    NgxJsonViewerModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
