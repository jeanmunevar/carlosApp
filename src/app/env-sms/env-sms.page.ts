import { Component, OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { Todo, AgregarService } from '../servicios/agregar.service'

@Component({
  selector: 'app-env-sms',
  templateUrl: './env-sms.page.html',
  styleUrls: ['./env-sms.page.scss'],
})
export class EnvSmsPage implements OnInit {

  items:any;

  customPickerOptions: any;

  dia: string;
  mes: string;
  ano: string;
  fecha: string;
  fecha2: string;

  mensaje: string;

  constructor(private sms: SMS,
    private todoService: AgregarService,
    ) { 

    }

  ngOnInit() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Confirmar',
        handler: (evento) => {
          console.log('Clicked Save!');
          this.dia = evento.day.value;
          this.mes = evento.month.value;
          this.ano = evento.year.value;
          this.fecha = this.dia+""+this.mes+""+this.ano;
          this.fecha2 = this.ano+"-"+this.mes+"-"+this.dia;
          console.log(this.fecha);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
        }
      }]
    }
  }

  

  envioSms(){
    this.todoService.getTodos().subscribe(res => {
     this.items = res;
    for(let item of res){
     this.sms.send(item.celular,this.mensaje).then(()=>{
          
       })
      }
      
    });
  }

  

}
