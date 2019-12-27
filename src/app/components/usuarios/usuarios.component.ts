import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  errors = null;
  formulario: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.formulario = formBuilder.group({
      nombre: [ '', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      usuario : ['', Validators.required],
      password : ['', Validators.required],
      password2 : ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar(){
    // se recuperan los valores de los formularios
    const usuario: Usuarios = {
      nombre: this.formulario.get('nombre').value,
      apellido: this.formulario.get('apellido').value,
      cedula: this.formulario.get('cedula').value,
      tipo: 'tecnico',
      usuario: this.formulario.get('usuario').value,
      password: this.formulario.get('password').value,
    };
    if (usuario.password == this.formulario.get('password2').value) {
        this.usuariosService.guardarUsuario(usuario).subscribe(data =>{
          if (data['guardado']) {
            this.router.navigate(['']);
          } else {
            this.errors = data['mensaje'];
          }
        });
    } else {
      this.errors = 'las contraseñas no son iguales';
    }
  }

}
