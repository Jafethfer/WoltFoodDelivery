import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaDetalleComponent } from './categoria-detalle/categoria-detalle.component'
import { ReactiveFormsModule } from '@angular/forms';
import { IsLoggedInService } from './is-logged-in.service';
import { LogInGuardGuard } from './log-in-guard.guard';
import { DefaultGuard } from './default.guard';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UsuariosComponent,
    MotoristasComponent,
    AdministradoresComponent,
    CategoriasComponent,
    OrdenesComponent,
    CategoriaDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [IsLoggedInService,LogInGuardGuard, DefaultGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
