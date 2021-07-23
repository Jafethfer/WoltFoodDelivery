import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})


export class CategoriasComponent implements OnInit{
  
  categorias:any = [
    {
      nombreCategoria: 'Farmacias',
      color: 'gold',
      descripcion: 'Medicamentos y mas'
    },
    {
      nombreCategoria: 'Restaurantes',
      color: 'cyan',
      descripcion: 'Comida chingona'
    },
    {
      nombreCategoria: 'Mandados',
      color: 'white',
      descripcion: 'Hacemos tus mandados'
    }
  ]

  constructor() { 
    
  }

  

  ngOnInit(): void {
    
  }

  

}
