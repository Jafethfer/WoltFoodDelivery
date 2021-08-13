declare var require:any
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';
import { CategoriasComponent } from '../categorias/categorias.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IsLoggedInService } from '../is-logged-in.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocode({accessToken: environment.mapboxKey})

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
  currentDirection:any
  @ViewChild('categoryCards') CardsContainer!:ElementRef;
  @ViewChild('PedidosModal') PedidosModal:any
  @ViewChild('DireccionModal') DireccionModal:any
  categoryInfo: any
  viewCategory: Boolean = false

  constructor(private httpClient: HttpClient, private activatedroute: ActivatedRoute, private loggedin: IsLoggedInService, private router:Router,
    private ModalService:NgbModal) { }

  OpenDetalleCategory(categoryInfo: any){
    this.categoryInfo = categoryInfo
    this.viewCategory = true
    this.CardsContainer.nativeElement.style.display='none'
  }

  OpenDireccionModal(){
    const add_marker = (event:any) => {
      var coordinates = event.lngLat;
      this.currentDirection = {lng: coordinates.lng, lat: coordinates.lat, place_name: ''}
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      geocodingClient.reverseGeocode({
        query: [coordinates.lng, coordinates.lat],
        types: ['locality']
      })
        .send()
        .then((response:any)=> {
          // GeoJSON document with geocoding matches
          const match = response.body;
          this.currentDirection.place_name = match.features[0].place_name
          const marker = new mapboxgl.Marker()
          .setLngLat([this.currentDirection.lng,this.currentDirection.lat])
          .addTo(map);
        });
    }

    this.ModalService.open(this.DireccionModal);
    (mapboxgl as any).accessToken = environment.mapboxKey
      var map = new mapboxgl.Map({
        container: 'mapa_direccion', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-86.793220,15.777040], // starting position
        zoom: 14 // starting zoom
      });
      map.on('click', add_marker);
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
      tipoProducto: nuevaOrden.tipoProducto,
      nombreEmpresa: nuevaOrden.nombreEmpresa,
      cantidad: nuevaOrden.cantidad,
      precio: nuevaOrden.precio,
      estado: 'Procesando',
      motoristaId: 3,
      nombreMotorista: 'Luis Fernando',
      place_name: this.currentDirection.place_name,
      lat: this.currentDirection.lat,
      lng: this.currentDirection.lng
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
        phoneCliente: this.currentUser.phone,
        productoId: nuevaOrden.productoId,
        nombreProducto: nuevaOrden.nombreProducto,
        tipoProducto: nuevaOrden.tipoProducto,
        nombreEmpresa: nuevaOrden.nombreEmpresa,
        cantidad: nuevaOrden.cantidad,
        precio: nuevaOrden.precio,
        estado: "Procesando",
        place_name: this.currentDirection.place_name,
        lat: this.currentDirection.lat,
        long: this.currentDirection.lng
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
