import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Todo, AgregarService } from '../servicios/agregar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private todoService: AgregarService,
    private emailComposer: EmailComposer, 
    private calendar: Calendar, 
    private iab: InAppBrowser, 
    public alertController: AlertController,
    private file: File,
    ) {}

  verificarCc(){
    this.iab.create('https://wsp.registraduria.gov.co/censo/consultar/', '_blank')
  }

  async alertEnvemail(){
    const alert = await this.alertController.create({
      header: 'Enviar Email',
      message: 'Desea enviar un email con los datos recolectados?!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          handler: () => {            
            this.enviarEmail();          
          }
        }
      ]
    });

    await alert.present();
  }

  enviarEmail(){
        
     let email = {
        app: 'gmail',
        to: '',
        attachments: [
         'file:///storage/emulated/0//Download/datoscampana.csv',
         'file://storage/emulated/0/Download/datoscampana.csv'
        ],
        subject: 'Datos Campaña',
        body: 'Estos son los datos que hasta ahora se han capturado de la campaña y estan en formato CSV',
        isHtml: true
     }
     
     this.emailComposer.open(email);
  }

  crearCalendario(){
    let date = new Date();
    let options = { };
    this.calendar.createEventInteractivelyWithOptions("Evento","Reunion","Notas especiales", date, date, options)
  }

  // EXPORT CSV
  exportCsv() {
  this.alertEnvemail();
  this.todoService.getTodos().subscribe(res => {
    var csvData = this.ConvertToCSV(res);
 
   //   

    var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
     var url= window.URL.createObjectURL(blob);
      a.href = url;
     a.download = 'Datos.csv';
     a.click();

  
      var fileName: any = "datoscampana.csv"
     this.file.writeFile(this.file.externalRootDirectory+"/Download", fileName, csvData )
       .then(
       _ => {
          
       }
       )
       .catch(
       err => {
  
            this.file.writeExistingFile(this.file.externalRootDirectory+"/Download", fileName, csvData)
           .then(
            _ => {
              
            }
            )
           .catch(
            err => {
              alert('Falla en la Descarga')
            }
            )
        }
        )
    });
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }


  async alertDarchivo(){
    const alert = await this.alertController.create({
      header: 'Modulo descarga',
      message: 'Para descargar el archivo debe ingresar la contraseña',
      inputs: [
        {
          name: 'Contrasena',
          type: 'text',
          placeholder: 'Escribe la contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Verificar',
          handler: (data) => {  
            if(data.Contrasena == "*#9854#k"){
              this.exportCsv();
            }else{
              this.alertEarchivo();
            }                        
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEarchivo(){
    const alert = await this.alertController.create({
      header: 'Error', 
      message: 'No tiene permisos para descargar el archivo',
      buttons: [
        {
          text: 'Ok!',
          role: 'cancel',
          cssClass: 'secondary',
        }        
      ]
    });

    await alert.present();
  }



}
