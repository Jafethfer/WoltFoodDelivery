import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  @Input() order!:any
  @Output() mostrarDetallePedido = new EventEmitter<any>()
  
  constructor() { }

  PedidoModal(order:any){
    this.mostrarDetallePedido.emit(order)
  }

  ngOnInit(): void {
  }

}
