import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser, faDoorOpen, faList, faChartBar, faUserAstronaut, faClipboardList, faBars, faUtensils, faPizzaSlice, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})


export class AdministradoresComponent implements OnInit {
  @ViewChild('adminUtils') adminUtils!: ElementRef;
  loggedAdmin:any
  faUser = faUser
  faDoor = faDoorOpen
  faList = faList
  faChartBar = faChartBar
  faUserAstronaut = faUserAstronaut
  faClipboardList = faClipboardList
  faBars = faBars
  faUtensils = faUtensils
  faPizzaSlice = faPizzaSlice
  faExclamationTriangle = faExclamationTriangle
  
  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedAdmin=history.state
  }

  collapseSideBar(){
    if(this.adminUtils.nativeElement.classList.length==2){
      this.adminUtils.nativeElement.classList.remove("nav-collapse")
    }else{
      this.adminUtils.nativeElement.classList.add("nav-collapse")
    }  
}

}
