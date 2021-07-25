import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { MotoristasComponent } from './motoristas/motoristas.component';

const routes:Routes = [
  {
    path: 'login', 
    component: LoginFormComponent
  },
  {
    path: 'signup',
    component: SignupFormComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'administrador',
    component: AdministradoresComponent
  },
  {
    path: 'motorista',
    component: MotoristasComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginFormComponent, SignupFormComponent, LandingPageComponent]
