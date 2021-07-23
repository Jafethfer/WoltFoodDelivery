import { Component, OnInit } from '@angular/core';
import { faUser, faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  faUser = faUser
  faDoor = faDoorOpen
  faList = faList

  constructor() { }

  ngOnInit(): void {
  }

}
