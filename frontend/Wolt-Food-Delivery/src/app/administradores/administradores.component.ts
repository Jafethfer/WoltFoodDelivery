import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faDoorOpen, faList, faChartBar, faUserAstronaut, faClipboardList, faBars, faUtensils, faPizzaSlice, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto'
import { IsLoggedInService } from '../is-logged-in.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})


export class AdministradoresComponent implements OnInit {
  @ViewChild('adminUtils') adminUtils!: ElementRef;
  @ViewChild('barChart') myChart!:ElementRef
  @ViewChild('pieChart') pieChart!:ElementRef
  @ViewChild('NuevoEmpleado') NuevoEmpleado:any
  @ViewChild('AgregarCategoria') AgregarCategoria:any
  @ViewChild('AgregarEmpresa') AgregarEmpresa:any
  pieData:Array<any> = []
  barData:any
  viewResumen:boolean=true
  viewMotoristas:boolean=false
  viewCategorias:boolean=false
  viewOrdenes:boolean=false
  viewProductos:boolean=false
  viewEmpresas:boolean=false
  viewQuejas:boolean=false
  loggedAdmin:any
  motoristas:any
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
  categorias:any
  empresas:any
  currentEmpresas:Array<any> = []
  empresasSelectOption:any = 0

  newEmployeeForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{4}\-[0-9]{4}$')]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required)
  })

  newCategoriaForm = new FormGroup({
    nombreCategoria: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    font: new FormControl('',Validators.required),
    shadow: new FormControl('',Validators.required)
  })

  newEmpresaForm = new FormGroup({
    nombreEmpresa: new FormControl('',Validators.required),
    categoria: new FormControl('',Validators.required)
  })

  constructor(private modalService: NgbModal,private router: Router,private activatedroute: ActivatedRoute,private httpClient:HttpClient, private loggedin: IsLoggedInService) { }

  ngOnInit(): void {
    this.loggedAdmin=history.state
    this.httpClient.get('http://localhost:3000/administrador/motoristas')
    .subscribe((results:any)=>{
      this.motoristas = results
    })
    this.httpClient.get('http://localhost:3000/administrador/categorias')
    .subscribe((results:any)=>{
      this.categorias = results
    })
    this.httpClient.get('http://localhost:3000/administrador/empresas')
    .subscribe((results:any)=>{
      this.empresas = results
      for(let i in this.empresas){
        for(let j in this.empresas[i].empresas){
          this.currentEmpresas.push(this.empresas[i].empresas[j])
        }
      }
    })

  }

  ngAfterViewInit(): void {
    this.httpClient.get('http://localhost:3000/administrador/pieChart')
    .subscribe((dataset:any)=>{
      this.pieData.push(dataset.Restaurantes,dataset.Farmacias,dataset.Mascotas,dataset.Bebidas)
      var pieChart = new Chart(this.pieChart.nativeElement.getContext('2d'), {
        type: 'pie',
        data: {
          labels: [
            'Restaurantes',
            'Farmacias',
            'Mascotas',
            'Bebidas'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: this.pieData,
            backgroundColor: [
              'rgb(238, 37, 37)',
              'rgb(238, 37, 204)',
              'rgb(64, 37, 238)',
              'rgb(37,224,238)'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
    })
    this.httpClient.get('http://localhost:3000/administrador/barChart')
    .subscribe((dataset:any)=>{
      this.barData = dataset
      var barChart = new Chart(this.myChart.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
            labels: this.barData.motoristaDatos,
            datasets: [{
                label: 'Pedidos de Motoristas',
                data: this.barData.pedidosDatos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          scales: {
              y: {
                beginAtZero: true
              }
          }
        }
      });
    })
  }

  collapseSideBar(){
    if(this.adminUtils.nativeElement.classList.length==2){
      this.adminUtils.nativeElement.classList.remove("nav-collapse")
    }else{
      this.adminUtils.nativeElement.classList.add("nav-collapse")
    }
  }

  Resumen(){
    this.barData = {}
    this.pieData = []
    this.viewResumen = true
    this.viewMotoristas = false
    this.viewEmpresas = false
    this.viewProductos = false
    this.viewQuejas = false
    this.viewCategorias = false
    this.viewOrdenes=false

    this.ngAfterViewInit()
  }

  Motoristas(){
    this.viewResumen = false
    this.viewMotoristas = true
    this.viewEmpresas = false
    this.viewProductos = false
    this.viewQuejas = false
    this.viewCategorias = false
    this.viewOrdenes=false
  }

  Empresas(){
    this.viewResumen = false
    this.viewMotoristas = false
    this.viewEmpresas = true
    this.viewProductos = false
    this.viewQuejas = false
    this.viewCategorias = false
    this.viewOrdenes=false
  }

  Productos(){
    this.viewResumen = false
    this.viewMotoristas = false
    this.viewEmpresas = false
    this.viewProductos = true
    this.viewQuejas = false
    this.viewCategorias = false
    this.viewOrdenes=false
  }

  Quejas(){
    this.viewResumen = false
    this.viewMotoristas = false
    this.viewEmpresas = false
    this.viewProductos = false
    this.viewQuejas = true
    this.viewCategorias = false
    this.viewOrdenes=false
  }

  Categorias(){
    this.viewResumen = false
    this.viewMotoristas = false
    this.viewEmpresas = false
    this.viewProductos = false
    this.viewQuejas = false
    this.viewCategorias = true
    this.viewOrdenes=false
  }

  Ordenes(){
    this.viewResumen = false
    this.viewMotoristas = false
    this.viewEmpresas = false
    this.viewProductos = false
    this.viewQuejas = false
    this.viewCategorias = false
    this.viewOrdenes= true
  }

  fireEmployee(motorista:any){
    if(confirm('Estas seguro que deseas despedir a '+motorista.firstName+" "+motorista.lastName+"?")){
      this.httpClient.post('http://localhost:3000/administrador/fireEmployee',{
        motoristaId: motorista.id
      })
      .subscribe((results:any)=>{
      console.log(results)
        this.httpClient.get('http://localhost:3000/administrador/motoristas')
        .subscribe((results:any)=>{
          this.motoristas = results
        })
      })
    }else{
      return;
    }
  }

  NuevoEmpleadoModal(){
    this.modalService.open(this.NuevoEmpleado,{size: 'lg'})
  }

  AgregarCategoriaModal(){
    this.modalService.open(this.AgregarCategoria,{size: 'lg'})
  }

  GuardarCategoria(){
    if(this.newCategoriaForm.valid){
      this.httpClient.post('http://localhost:3000/administrador/agregarCategoria',{
        nombreCategoria: this.newCategoriaForm.get('nombreCategoria')?.value,
        descripcion: this.newCategoriaForm.get('descripcion')?.value,
        font: this.newCategoriaForm.get('font')?.value,
        shadow: this.newCategoriaForm.get('shadow')?.value,
      })
      .subscribe((results:any)=>{
        console.log(results)
        alert('Categoria agregada con exito!')
        this.httpClient.get('http://localhost:3000/administrador/categorias')
        .subscribe((results:any)=>{
          this.categorias = results
        })
      })
    }else{
      return;
    }
  }

  filterCategoria(){
    if(this.empresasSelectOption==0){
      for(let i in this.empresas){
        for(let j in this.empresas[i].empresas){
          this.currentEmpresas.push(this.empresas[i].empresas[j])
        }
      }
    }else{
      this.currentEmpresas = []
      this.currentEmpresas = this.empresas[this.empresasSelectOption-1].empresas
    }

  }

  AgregarEmpleado(){
    if(this.newEmployeeForm.valid){
      this.httpClient.post('http://localhost:3000/administrador/hireEmployee',{
        firstName: this.newEmployeeForm.get('firstName')?.value,
        lastName: this.newEmployeeForm.get('lastName')?.value,
        phone: this.newEmployeeForm.get('phone')?.value,
        email: this.newEmployeeForm.get('email')?.value,
        password: this.newEmployeeForm.get('password')?.value
      })
      .subscribe((results:any)=>{
        console.log(results)
        this.httpClient.get('http://localhost:3000/administrador/motoristas')
        .subscribe((results:any)=>{
          this.motoristas = results
        })
        alert('Empleado Agregado!')
      })
    }else{
      return;
    }
  }

  AgregarEmpresaModal(){
    this.modalService.open(this.AgregarEmpresa,{size: 'lg'})
  }

  GuardarNuevaEmpresa(){
    if(this.newEmpresaForm.get('categoria')?.value==0){
      return;
    }else{
      this.httpClient.post('http://localhost:3000/administrador/agregarEmpresa',{
        nombreEmpresa: this.newEmpresaForm.get('nombreEmpresa')?.value,
        nombreCategoria: this.newEmpresaForm.get('categoria')?.value,
      })
      .subscribe((results:any)=>{
        console.log(results)
        this.httpClient.get('http://localhost:3000/administrador/empresas')
        .subscribe((results:any)=>{
          this.empresas = results
        })
      })
    }
  }

  getFirstName(){
    return this.newEmployeeForm.get('firstName')
  }

  getLastName(){
    return this.newEmployeeForm.get('lastName')
  }

  getPhone(){
    return this.newEmployeeForm.get('phone')
  }

  getEmail(){
    return this.newEmployeeForm.get('email')
  }

  getPassword(){
    return this.newEmployeeForm.get('password')
  }

  signOut(){
    this.loggedin.loggedIn=false
    this.loggedin.role=''
    this.router.navigate([''])
  }

}
