import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faDoorOpen, faUser, faList, faBoxOpen, faPaw, faGlassCheers, faShoppingBasket, faPizzaSlice, faExclamationTriangle, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent implements OnInit {
  @ViewChild('motoristUtils') motoristUtils!: ElementRef;
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
  ordenes:any = [
    {
      tipo: 'mandadito',
      usuario: 'Mario Jose',
      descripcion: "Necesito que traigan un cargador de mi casa",
      hora: "12:50",
      estado: "terminado"
    }
  
  ]

  constructor() { }

  ngOnInit(): void {
  }

  collapseSideBar(){
    if(this.motoristUtils.nativeElement.classList.length==2){
      this.motoristUtils.nativeElement.classList.remove("nav-collapse")
    }else{
      this.motoristUtils.nativeElement.classList.add("nav-collapse")
    }  
}

}
