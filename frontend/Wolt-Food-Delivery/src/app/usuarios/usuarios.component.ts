import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';
import { CategoriasComponent } from '../categorias/categorias.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  currentUser:any
  faUser = faUser
  faDoor = faDoorOpen
  faList = faList
  @ViewChild('categoryCards') CardsContainer!:ElementRef;
  categoryInfo: any
  viewCategory: Boolean = false

  constructor(private httpClient: HttpClient, private activatedroute: ActivatedRoute) { }

  OpenDetalleCategory(categoryInfo: any){
    this.categoryInfo = categoryInfo
    this.viewCategory = true
    this.CardsContainer.nativeElement.style.display='none'
  }

  CerrarDetalleCategoria(actuar: any){
    this.viewCategory=false
    this.CardsContainer.nativeElement.style.display='block'
  }

  CrearNuevaOrden(nuevaOrden:any){
    this.httpClient.post('http://localhost:3000/usuario/agregarOrden',
    {
      usuarioId: 1,
      nuevaOrden: nuevaOrden
    })
    .subscribe(results=>{
      console.log(results)
    })
  }

  ngOnInit(): void {
    this.currentUser=history.state
  }

}
