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
      imagen: '../../assets/img/cards/farmacia-card.png',
      font: 'black',
      shadow: '1px 1px white'
    },
    {
      nombreCategoria: 'Restaurantes',
      descripcion: 'Comida chingona',
      imagen: '../../assets/img/cards/restaurante-card.jpg',
      font: 'white',
      shadow: '1px 1px black'
    },
    {
      nombreCategoria: 'Mandados',
      descripcion: 'Hacemos tus mandados',
      imagen: '../../assets/img/cards/mandadito-card.jpg',
      font: 'white',
      shadow: '1px 1px black'
    },
    {
      nombreCategoria: 'Mascotas',
      descripcion: 'Lo necesario para mantener a tus mascotas felices',
      imagen: '../../assets/img/cards/mascotas-card.jpg',
      font: 'black',
      shadow: '1px 1px white'
    },
    {
      nombreCategoria: 'Super',
      descripcion: 'Compra lo que necesites sin moverte de casa',
      imagen: '../../assets/img/cards/supermarket-card.jpg',
      font: 'black',
      shadow: '1px 1px white'
    },
    {
      nombreCategoria: 'Bebidas',
      descripcion: 'Bebidas para las fiestas',
      imagen: '../../assets/img/cards/bebidas-card.jpg',
      font: 'white',
      shadow: '1px 1px black'
    },
  ]

  constructor() { 
    
  }

  

  ngOnInit(): void {
    
  }

  

}
