import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';
import { CategoriasComponent } from '../categorias/categorias.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IsLoggedInService } from '../is-logged-in.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  currentUser:any
  pedidos:any
  faUser = faUser
  faDoor = faDoorOpen
  faList = faList
  @ViewChild('categoryCards') CardsContainer!:ElementRef;
  @ViewChild('PedidosModal') PedidosModal:any
  categoryInfo: any
  viewCategory: Boolean = false

  constructor(private httpClient: HttpClient, private activatedroute: ActivatedRoute, private loggedin: IsLoggedInService, private router:Router,
    private ModalService:NgbModal) { }

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
      id: this.currentUser.phone+"-"+(parseInt(this.pedidos[this.pedidos.length-1].id.charAt(this.pedidos[this.pedidos.length-1].id.length-1))+1),
      usuarioId: this.currentUser.id,
      productoId: nuevaOrden.productoId,
      nombreProducto: nuevaOrden.nombreProducto,
      cantidad: nuevaOrden.cantidad,
      precio: nuevaOrden.precio,
      estado: 'Procesando',
      motoristaId: 3,
      nombreMotorista: 'Luis Fernando'
    })
    .subscribe(results=>{
      console.log(results)
      this.getOrders()
      this.httpClient.post('http://localhost:3000/motorista/agregarOrden',
      {
        motoristaId: 1,
        id: this.currentUser.phone+"-"+(parseInt(this.pedidos[this.pedidos.length-1].id.charAt(this.pedidos[this.pedidos.length-1].id.length-1))+1),
        clienteId: this.currentUser.id,
        cliente: this.currentUser.firstName+" "+this.currentUser.lastName,
        productoId: nuevaOrden.productoId,
        nombreProducto: nuevaOrden.nombreProducto,
        cantidad: nuevaOrden.cantidad,
        precio: nuevaOrden.precio,
        estado: "Procesando"
      })
      .subscribe(results=>{
        console.log(results)
      })
    })
  }

  signOut(){
    this.loggedin.loggedIn=false
    this.loggedin.role=''
    this.router.navigate([''])
  }

  showOrders(){
    this.ModalService.open(this.PedidosModal,{size: 'lg'})
  }

  getOrders(){
    this.httpClient.post('http://localhost:3000/usuario/pedidos',
    {
      usuarioId: this.currentUser.id
    })
    .subscribe((pedidos:any)=>{
      this.pedidos=pedidos
    })
  }

  ngOnInit(): void {
    this.currentUser=history.state
    this.getOrders()
  }

}
