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
      descripcion: 'Medicamentos y mas',
      imagen: '../../assets/img/cards/farmacia-card.png'
    },
    {
      nombreCategoria: 'Restaurantes',
      descripcion: 'Comida chingona',
      imagen: '../../assets/img/cards/restaurante-card.jpg'
    },
    {
      nombreCategoria: 'Mandados',
      descripcion: 'Hacemos tus mandados',
      imagen: '../../assets/img/cards/mandadito-card.jpg'
    },
    {
      nombreCategoria: 'Mascotas',
      descripcion: 'Lo necesario para mantener a tus mascotas felices',
      imagen: '../../assets/img/cards/mascotas-card.jpg'
    },
    {
      nombreCategoria: 'Super',
      descripcion: 'Compra lo que necesites sin moverte de casa',
      imagen: '../../assets/img/cards/supermarket-card.jpg'
    },
    {
      nombreCategoria: 'Bebidas',
      descripcion: 'Bebidas para las fiestas',
      imagen: '../../assets/img/cards/bebidas-card.jpg'
    },
  ]

  constructor() { 
    
  }

  

  ngOnInit(): void {
    
  }

  

}
