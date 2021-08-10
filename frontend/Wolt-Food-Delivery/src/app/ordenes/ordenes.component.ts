import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  @Input() order!:any
  constructor() { }

  ngOnInit(): void {
  }

}
