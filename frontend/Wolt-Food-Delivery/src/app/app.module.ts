import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdenesComponent } from './ordenes/ordenes.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UsuariosComponent,
    MotoristasComponent,
    AdministradoresComponent,
    CategoriasComponent,
    OrdenesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
