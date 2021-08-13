declare var require:any
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faDoorOpen, faUser, faList, faBoxOpen, faPaw, faGlassCheers, faShoppingBasket, faPizzaSlice, faExclamationTriangle, faBars, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as mapboxgl from 'mapbox-gl';
import { IsLoggedInService } from '../is-logged-in.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocode({accessToken: environment.mapboxKey})
@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent implements OnInit {
  
  currentUser:any
  pedidosOrdenes:Array<any> = []
  mascotasOrdenes:Array<any> = []
  bebidasOrdenes:Array<any> = []
  superOrdenes:Array<any> = []
  restaurantesOrdenes:Array<any> = []
  farmaciasOrdenes:Array<any> = []
  currentOrder:any
  farmaciasView:boolean = false
  pedidosView:boolean = false
  mascotasView:boolean = false
  bebidasView:boolean = false
  superView:boolean = false
  restaurantesView:boolean = false
  quejasView:boolean = false
  @ViewChild('motoristUtils') motoristUtils!: ElementRef;
  @ViewChild('PedidosModal') pedidosModal:any;
  faUser = faUser
  faDoor = faDoorOpen
  faList = faList
  faBoxOpen = faBoxOpen
  faPaw = faPaw
  faGlassCheers = faGlassCheers
  faShoppingBasket = faShoppingBasket
  faPizzaSlice = faPizzaSlice
  faExclamationTriangle = faExclamationTriangle
  faBars = faBars
  faHeartbeat = faHeartbeat

  mapa!: mapboxgl.Map;
  marker = new mapboxgl.Marker();

  getOrders(){
    this.httpClient.post('http://localhost:3000/motorista/ordenes',
    {
      motoristaId: this.currentUser.id
    })
    .subscribe((results:any)=>{
      for(let order in results){
        if(results[order].tipoProducto=="Restaurantes"){
          this.restaurantesOrdenes.push(results[order])
        }else if(results[order].tipoProducto=="Farmacias"){
          this.farmaciasOrdenes.push(results[order])
        }else if(results[order].tipoProducto=="Mandados"){
          this.pedidosOrdenes.push(results[order])
        }else if(results[order].tipoProducto=="Mascotas"){
          this.mascotasOrdenes.push(results[order])
        }else if(results[order].tipoProducto=="Super"){
          this.superOrdenes.push(results[order])
        }else if(results[order].tipoProducto=="Bebidas"){
          this.bebidasOrdenes.push(results[order])
        }
      }
    })
  }

  PedidoModal(order:any){
    this.currentOrder=order
    this.modalService.open(this.pedidosModal,{size:'lg'});
    (mapboxgl as any).accessToken = environment.mapboxKey
    const map = new mapboxgl.Map({
      container: 'mapa-orden', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.currentOrder.long,this.currentOrder.lat], // starting position
      zoom: 14 // starting zoom
    });
    const marker = new mapboxgl.Marker()
    .setLngLat([this.currentOrder.long,this.currentOrder.lat])
    .addTo(map);

    map.on('click', this.add_marker);
  }

  add_marker(event:any) {
    var coordinates = event.lngLat;
    console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
    geocodingClient.reverseGeocode({
      query: [coordinates.lng, coordinates.lat],
      types: ['locality']
    })
      .send()
      .then((response:any)=> {
        // GeoJSON document with geocoding matches
        const match = response.body;
        console.log(match.features[0].place_name)
      });
    
    /*this.marker.setLngLat(coordinates).addTo(this.mapa);*/
  }

  mostrarOrdenes(tipoOrden:String){
    if(tipoOrden=="Mandaditos"){
      this.pedidosView=true
      this.farmaciasView=false
      this.mascotasView=false
      this.restaurantesView=false
      this.superView=false
      this.bebidasView=false
    }else if(tipoOrden=="Farmacias"){
      this.pedidosView=false
      this.farmaciasView=true
      this.mascotasView=false
      this.restaurantesView=false
      this.superView=false
      this.bebidasView=false
    }else if(tipoOrden=="Mascotas"){
      this.pedidosView=false
      this.farmaciasView=false
      this.mascotasView=true
      this.restaurantesView=false
      this.superView=false
      this.bebidasView=false
    }else if(tipoOrden=="Bebidas"){
      this.pedidosView=false
      this.farmaciasView=false
      this.mascotasView=false
      this.restaurantesView=false
      this.superView=false
      this.bebidasView=true
    }else if(tipoOrden=="Super"){
      this.pedidosView=false
      this.farmaciasView=false
      this.mascotasView=false
      this.restaurantesView=false
      this.superView=true
      this.bebidasView=false
    }else if(tipoOrden=="Restaurantes"){
      this.pedidosView=false
      this.farmaciasView=false
      this.mascotasView=false
      this.restaurantesView=true
      this.superView=false
      this.bebidasView=false
    }
  }
  
  constructor(private httpClient: HttpClient, private modalService: NgbModal,private loggedin: IsLoggedInService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=history.state
    
    this.getOrders();

    
  }

  signOut(){
    this.loggedin.loggedIn=false
    this.loggedin.role=''
    this.router.navigate([''])
  }

  collapseSideBar(){
    if(this.motoristUtils.nativeElement.classList.length==2){
      this.motoristUtils.nativeElement.classList.remove("nav-collapse")
    }else{
      this.motoristUtils.nativeElement.classList.add("nav-collapse")
    }  
  }

}
