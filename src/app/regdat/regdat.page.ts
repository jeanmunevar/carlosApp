import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Todo, AgregarService } from '../servicios/agregar.service';

@Component({
  selector: 'app-regdat',
  templateUrl: './regdat.page.html',
  styleUrls: ['./regdat.page.scss'],
})
export class RegdatPage implements OnInit{

  fecha1 = new Date();
  fecha2 = this.fecha1.getDay()+""+this.fecha1.getMonth()+""+this.fecha1.getFullYear();
  todo: Todo = {
    nombre: '',
    apellido: "",
       cedula : "",
       celular : "",
       email : "",
       direccion : "",
       barrio : "",
       comuna : "",
       mesa : "",
       comentario:"",
    fecha: this.fecha2,
  };

  todoId = null;

  pv: Array<any> = [
    {
      puestodevotacion: "Alcaravan La Niata"
    },
    {
      puestodevotacion: "Marco Fidel Suarez"
    },
    {
      puestodevotacion: "Carcel Municipal"
    },
    {
      puestodevotacion: "El Charte"
    },
    {
      puestodevotacion: "El Morro"
    },
    {
      puestodevotacion: "El Paraiso"
    },
    {
      puestodevotacion: "Luis Hernandez Vargas"
    },
    {
      puestodevotacion: "Braulio Gonzalez"
    },
    {
      puestodevotacion: "Simon Bolivar"
    },
    {
      puestodevotacion: "Carlos Lleras Restrepo"
    },
    {
      puestodevotacion: "C S La Presentacion"
    },
    {
      puestodevotacion: "La CampiÑa"
    },
    {
      puestodevotacion: "Manuela Beltran"
    },
    {
      puestodevotacion: "I.tec.Ambiental San Mateo"
    },
    {
      puestodevotacion: "I.tec.Empresarial Yopal Itey"
    },
    {
      puestodevotacion: "La Chaparrera"
    },
    {
      puestodevotacion: "Matelimon"
    },
    {
      puestodevotacion: "Megacolegio "
    },
    {
      puestodevotacion: "Morichal"
    },
    {
      puestodevotacion: "Punto Nuevo"
    },
    {
      puestodevotacion: "Quebradaseca"
    },
    {
      puestodevotacion: "Tacarimena"
    },
    {
      puestodevotacion: "Tilodiran"
    },
    
  ];
 
    constructor(
      private nav: NavController,
    private loadingController: LoadingController,
    private todoService: AgregarService,
    private toastController: ToastController,
    ) { 
      
    }

    ngOnInit() {
       
    }

    
  // CREATE
  async addDatos(){
    
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        
       
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        this.todo.nombre = "";
        this.todo.apellido = "";
        this.todo.cedula = "";
        this.todo.celular = "";
        this.todo.email = "";
        this.todo.direccion = "";
        this.todo.barrio = "";
        this.todo.comuna = "";
        this.todo.mesa = "";
        this.todo.comentario = "";
        alert("Datos Guardados")
      });
    }
  }
  

 


}
