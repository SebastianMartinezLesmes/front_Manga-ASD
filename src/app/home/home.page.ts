import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios  from 'axios'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private alertController: AlertController
  ){
    this.getMangas();
    this.questInto();
  }

  list:string = 'false';
  cargo: string = '';

  idU: any = []; 

  name: string = '';
  lastName: string = '';
  celular: string = '';
  otherName: string = '';
  email: string = '';
  password: string = '';  

  ventana: string = '';
  number: any = [
    {id: 1, idMAngaFKName: 1, fecha_alquiler: 'fecha 1'},
    {id: 2, idMAngaFKName: 2, fecha_alquiler: 'fecha 2'},
    {id: 3, idMAngaFKName: 3, fecha_alquiler: 'fecha 3'},
    {id: 4, idMAngaFKName: 4, fecha_alquiler: 'fecha 4'},
    {id: 5, idMAngaFKName: 5, fecha_alquiler: 'fecha 5'},
    {id: 6, idMAngaFKName: 6, fecha_alquiler: 'fecha 6'},
    {id: 7, idMAngaFKName: 7, fecha_alquiler: 'fecha 7'},
    {id: 8, idMAngaFKName: 8, fecha_alquiler: 'fecha 8'},
    {id: 9, idMAngaFKName: 9, fecha_alquiler: 'fecha 9'},
  ];

  title: string = '';
  description: string = '';
  cant: number = 0;
  price: string = '';

  limpiar(){
    this.name = '';
    this.lastName = '';
    this.celular = '';
    this.otherName = '';
    this.email = '';
    this.password = '';

    this.title = '';
    this.description = '';
    this.cant = 0;
    this.price = '';
  };

  mostrarManga(){this.ventana = ''; this.changeList();}
  mostrarregistro(){this.ventana = 'registro'; this.changeList();}
  mostrarCrearUsuario(){this.ventana = 'crear_usuario'; this.changeList();}
  mostrarCrearManga(){this.ventana = 'crear_manga'; this.changeList();}
  mostrarMisMangas(){this.ventana = 'mis_manga'; this.changeList();}

  questInto(){
    if(this.cargo === ''|| this.cargo === ' '){
      this.cargo ='visitante';
    } 
  }

  crearManga(){
    let camposVacios = '';
    let cont = 0;
  
    if (this.title === '') {
      camposVacios += 'Nombre del manga, ';
      cont = cont + 1;
    }
    if (this.description === '') {
      camposVacios += 'Descripción, ';
      cont = cont + 1;
    }
    if (this.cant === 0) {
      camposVacios += 'Cantidad, ';
      cont = cont + 1;
    }
    if (this.price === '') {
      camposVacios += 'Precio, ';
      cont = cont + 1;
    }
    if (this.imageSrc === '') {
      camposVacios += 'Imagen, ';
      cont = cont + 1;
    }  
    camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
    if (cont !== 0){ this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina",""+ camposVacios ); }
    else { 
      console.log(this.title+' '+this.description+' '+this.cant+' '+this.price)
      console.log(this.imageSrc);
      let manga = {
        title: this.title,
        description: this.description,
        amount: this.cant,
        price: this.price,
        image: this.imageSrc,
      };
      /*aca el proceso para crear el manga*/
      axios.post('http://localhost:8080/api/mangas/add', manga, { headers: this.requestHeaders })
      .then(response => {
        this.presentAlert ("Manga creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        this.presentAlert ("Error al crear el manga", "");
        console.error('Error al enviar el ID al servidor:', error);
      });

      this.getMangas();
    }
    this.limpiar();
  };

  async crearUsuario(){
    let camposVacios = '';
    let cont = 0;
  
    if (this.name === '') {
      camposVacios += 'Nombre, ';
      cont = cont + 1;
    }
    if (this.lastName === '') {
      camposVacios += 'Apellido, ';
      cont = cont + 1;
    }
    if (this.email === '') {
      camposVacios += 'Email, ';
      cont = cont + 1;
    }
    if (this.celular === '') {
      camposVacios += 'Celular, ';
      cont = cont + 1;
    }
    if (this.otherName === '') {
      camposVacios += 'username, ';
      cont = cont + 1;
    }
    if (this.password === '') {
      camposVacios += 'Contraseña, ';
      cont = cont + 1;
    }
  
    camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
    if (cont !== 0){ this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina",""+ camposVacios ); }
    else { 
      console.log('Datos del usuario:', {
        name: this.name = this.name,
        lastName: this.lastName = this.lastName,
        email: this.email = this.email,
        celular: this.celular = this.celular,
        otherName: this.otherName = this.otherName,
        password: this.password = this.password,
      })
      let user = {
        name: this.name,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.celular,
        username: this.otherName
      };
      /*aca va el metodo para crear usuarios*/
      axios.post('http://localhost:8080/api/users/add', user, { headers: this.requestHeaders })
      .then(response => {
        this.presentAlert ("Usuario creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        this.presentAlert ("Error al crear el usuario", "");
        console.error('Error al enviar el ID al servidor:', error);
      });
    }
  };

  changeList() {
    if (this.list === 'true') {
      this.list = 'false';
    } else if (this.list === 'false') {
      this.list = 'true';
    }
  };
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }
  
  /*proceso de login */
  login() {
    const inputUsername = this.email;
    const inputPassword = this.password;
    
    if (this.email === '' || this.password === '') {
      // Al menos uno de los campos está vacío
      let camposVacios = '';
      let cont = 0;
    
      if (this.email === '') {
        camposVacios += 'Email, ';
        cont = cont + 1;
      }
      if (this.password === '') {
        camposVacios += 'Contraseña, ';
        cont = cont + 1;
      }
    
      camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
      if (cont === 2){ this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina",""+ camposVacios ); }
      else { this.presentAlert("El campo "+ camposVacios, "Es requerido para ingresar a la paguina" );}
    }
    else{

      let credenciales = {
        email: this.email,
        password: this.password
      }

      /*metodo para enviar credenciales*/
      axios.post('http://localhost:8080/api/users/login', credenciales)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        this.token = response;

        this.idU = response.data[0];
        this.tokenKey = response.data[1];
        this.cargo = response.data[2];

        this.ventana = '';
        this.getHistorialF();
        this.presentAlert("usuario registrado", "ahora puedes alquilar tu manga");

        //requestHeaders
        console.log(this.requestHeaders);
        console.log('aca esta el token: '+this.tokenKey);

      })
      .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
        console.log(this.requestHeaders);
        this.presentAlert("usuario inexistente", "");
      });

      /*metodo para recibir token*/
      console.log('Esto es lo que resive el token: '+this.token);
      
    } this.limpiar();
  };

  imageSrc: any;
  previewImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  };  

  //aca recibe el token
  token: any = [];
  tokenKey: any = '';

  requestHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenKey}`
  });

  //aca recibe los mangas
  mangasDB: any = [];
  getMangas() {
    this.http.get('http://localhost:8080/api/mangas/list').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.mangasDB = response;
      },(error) => {console.error('Error al obtener los mangas del servidor:', error);}
    )
  };


  //aca recibe los detalles del alquiler
  detallesDB: any = [];
  gHistorialDetalle: any = [];
  getHistorialF() {
    this.http.get('http://localhost:8080/api/details/list', { headers: this.requestHeaders }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.detallesDB = response;
        this.gHistorialDetalle = this.detallesDB.filter((u: any) => u.id_detail_ma === this.idU);
      },(error) => {console.error('Error al obtener los detalles de los mangas del servidor:', error);}
    )
  };

  /*funcion para alquilar un manga*/
  async alquilar(dat: any){ const alert = await this.alertController.create({
    header: '¿Está seguro de que desea alquilar este manga?',
    message: 'Despues de alquilarlo tendras 15 dias para devolverlo.',
    buttons: [
      {
        text: 'Cancelar',
        cssClass: 'secondary',
        handler: () => {}
      },
      {
        text: 'Aceptar',
        handler: () => {
          if(this.cargo === 'visitante'){
            this.presentAlert ("No puedes alquilar un manga", "Si no te has registrado, ve al boton de arriba y registrate"); 
          }
          else{ 
            let manga = {
              idMangaFK: dat.idManga,
              idUserFK: this.idU,
            }
            console.log(manga.idMangaFK+' '+manga.idUserFK);

            /*metodo para enviar el id del manga*/
            axios.post('http://localhost:8080/api/details/add', manga, { headers: this.requestHeaders })
            .then(response => {
              console.log('Respuesta del servidor:', response.data);
              this.presentAlert ("Manga alquilado", "Disfruta de tu manga y no se te olvide devolverlo.");
            })
            .catch(error => {
              console.error('Error al enviar el ID al servidor:', error);
              this.presentAlert ("Error al alquilar el manga", "TRabajamos para solucionarlo.");
            });
            this.getMangas();
          } 
        }
      }], mode: 'ios'
    });await alert.present();
  };

  /*aca esta la funcion para devolver manga*/
  devolver(dev:any){
    let id_detail_ma = dev.id_manga;
    console.log(id_detail_ma+' '+this.idU);

    // Realiza la solicitud PUT al servidor PHP
    axios.put(`http://localhost:8080/api/details/${id_detail_ma}`, { headers: this.requestHeaders })
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar el ID al servidor:', error);
    });

    this.presentAlert ("Manga devuelto", "Gracias por devolver el manga");
    this.getMangas();
  }
}