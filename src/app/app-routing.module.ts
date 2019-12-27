import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { OrdenComponent } from './components/orden/orden.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { ReporteComponent } from './components/reporte/reporte.component';



const routes: Routes = [
  { path: '', component: LoguinComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'reportes', component: ReporteComponent },
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'orden/:id', component: OrdenComponent },
  { path: 'orden', component: OrdenComponent },
  { path: '**', pathMatch : 'full', redirectTo: 'ordenes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
