import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.component.html',
  styleUrls: ['./categoria-detalle.component.css']
})
export class CategoriaDetalleComponent implements OnInit {
  
  faCaretLeft = faCaretLeft
  productos: any
  currentCompany:any
  producto: any
  @Input() categoryInfo:any
  @Output() goBackEvent = new EventEmitter<any>()
  @Output() ordenarProducto = new EventEmitter<any>()
  @ViewChild('ProductosModal') ProductosModal:any;
  @ViewChild('PedirModal') PedirModal:any;

  pedirProductoForm = new FormGroup({
    cantidad: new FormControl('',[Validators.required]),
    pago: new FormControl('',[Validators.required])
  })

  get cantidad(){ return this.pedirProductoForm.get('cantidad')}
  get pago(){ return this.pedirProductoForm.get('pago')}

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  goBack(){
    this.goBackEvent.emit(true)
  }

  ModalProductos(nombre:any,productos: any){
    this.productos=productos
    this.currentCompany=nombre
    this.modalService.open(this.ProductosModal,{ centered: true, size: 'lg' })
  }

  pedirModal(producto:any){
    this.producto = producto
    this.modalService.open(this.PedirModal)
  }

  pedirProducto(producto:any){
    if(this.pedirProductoForm.valid){
      this.modalService.dismissAll()
      alert('Estamos procesando tu orden!')
      let nuevaOrden = {
        productoId: producto.id,
        nombreProducto: producto.nombreProducto,
        tipoProducto: this.categoryInfo.nombreCategoria,
        nombreEmpresa: this.currentCompany,
        cantidad: this.pedirProductoForm.get('cantidad')?.value,
        precio: this.pedirProductoForm.get('cantidad')?.value*producto.precio,
        pago: this.pedirProductoForm.get('pago')?.value
      }
      this.ordenarProducto.emit(nuevaOrden)
    }else{
      alert('Formulario invalido, revisa tu orden.')
    }
    
  }

}
