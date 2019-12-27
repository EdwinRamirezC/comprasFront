import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'src/app/interfaces/log';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
})
export class LoguinComponent implements OnInit {

  formulario: FormGroup;
  errors = null;
  success = null;
  session = JSON.parse(sessionStorage.getItem('usuario'));

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    // se verifica si el usuario esta autenticado si es asi se redirecciona a la pagina principal
    if (this.session) {
      (this.session.usuario) ? this.router.navigate(['/ordenes']) : '';
    }
    this.formulario = formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  // funcion utilizada para logear el usuario
  log() {
    const log: Log = {
      usuario : this.formulario.get('usuario').value,
      password : this.formulario.get('password').value
    };
    this.usuariosService.consultarUsuario(log).subscribe(data => {
       this.success = data['mensaje'];
       if (data['usuario'] == 1) {
        sessionStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigate(['/ordenes']);
       }
    }, error => {
      this.errors = error.errorror;
    });
  }

}
