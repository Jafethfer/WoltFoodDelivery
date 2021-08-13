import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})


export class CategoriasComponent implements OnInit{
  
  categorias:any
  @Input() currentDirection:any

  @Output() CategoryDescriptionEvent = new EventEmitter<any>()

  categoryDetalle(categoryInfo: any){
    if(this.currentDirection){
      this.CategoryDescriptionEvent.emit(categoryInfo)
    }else{
      alert('Debes elegir una direccion antes de comenzar a ordenar!')
    }
    
  }

  constructor(private httpClient: HttpClient) { 
    
  }

  

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/categoria/all')
    .subscribe(res=>{
      this.categorias=res
    })
  }

  

}
