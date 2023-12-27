import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios from 'axios'

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
  ) {
    this.getMangas();
    this.questInto();
  }

  list: string = 'false';
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
    { id: 1, idMAngaFKName: 1, fecha_alquiler: 'fecha 1' },
    { id: 2, idMAngaFKName: 2, fecha_alquiler: 'fecha 2' },
    { id: 3, idMAngaFKName: 3, fecha_alquiler: 'fecha 3' },
    { id: 4, idMAngaFKName: 4, fecha_alquiler: 'fecha 4' },
    { id: 5, idMAngaFKName: 5, fecha_alquiler: 'fecha 5' },
    { id: 6, idMAngaFKName: 6, fecha_alquiler: 'fecha 6' },
    { id: 7, idMAngaFKName: 7, fecha_alquiler: 'fecha 7' },
    { id: 8, idMAngaFKName: 8, fecha_alquiler: 'fecha 8' },
    { id: 9, idMAngaFKName: 9, fecha_alquiler: 'fecha 9' },
  ];

  title: string = '';
  description: string = '';
  cant: number = 0;
  price: number = 0;

  limpiar() {
    this.name = '';
    this.lastName = '';
    this.celular = '';
    this.otherName = '';
    this.email = '';
    this.password = '';

    this.title = '';
    this.description = '';
    this.cant = 0;
    this.price = 0;
  };

  mostrarManga() { this.ventana = ''; this.changeList(); }
  mostrarregistro() { this.ventana = 'registro'; this.changeList(); }
  mostrarCrearUsuario() { this.ventana = 'crear_usuario'; this.changeList(); }
  mostrarCrearManga() { this.ventana = 'crear_manga'; this.changeList(); }
  mostrarMisMangas() { this.ventana = 'mis_manga'; this.changeList(); }

  questInto() {
    if (this.cargo === '' || this.cargo === ' ') {
      this.cargo = 'visitante';
    }
  }

  crearManga() {
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
    if (this.price === 0) {
      camposVacios += 'Precio, ';
      cont = cont + 1;
    }
    if (this.imageSrc === '') {
      camposVacios += 'Imagen, ';
      cont = cont + 1;
    }
    camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
    if (cont !== 0) { this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina", "" + camposVacios); }
    else {
      console.log(this.title + ' ' + this.description + ' ' + this.cant + ' ' + this.price)
      console.log(this.ima);
      let manga = {
        title: this.title,
        description: this.description,
        amount: this.cant,
        price: this.price,
        file: this.ima,
      };

      /*aca la funcion para crear el manga*/
      axios.post('http://localhost:8080/api/mangas/add', manga, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.tokenKey}`
        }
      }).then(response => {
        this.presentAlert("Manga creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
      }).catch(error => {
        this.presentAlert("Error al crear el manga", "");
        console.error('Error al crear el manga,', error);
      });

      this.getMangas();
    }
    this.limpiar();
  };

  async crearUsuario() {
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
    if (cont !== 0) { this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina", "" + camposVacios); }
    else {
      console.log('Datos del usuario:', {
        name: this.name = this.name,
        lastName: this.lastName = this.lastName,
        email: this.email = this.email,
        celular: this.celular = this.celular,
        otherName: this.otherName = this.otherName,
        password: this.password = this.password,
        rol: this.cargo = this.cargo,
      })
      let user = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.celular,
        username: this.otherName,
        role: 'Cliente'
      };
      /*aca va el metodo para crear usuarios*/
      axios.post('http://localhost:8080/api/users/add', user).then(response => {
        this.presentAlert("Usuario creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
        this.ventana = '';
      }).catch(error => {
        this.presentAlert("Error al crear el usuario", "");
        console.error('Error al enviar el ID al servidor:', error);
      });
    } 
    this.limpiar();
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
      if (cont === 2) { this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina", "" + camposVacios); }
      else { this.presentAlert("El campo " + camposVacios, "Es requerido para ingresar a la paguina"); }
    }
    else {

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
          console.log('aca esta el token: ' + this.tokenKey);

        })
        .catch(error => {
          console.error('Error al enviar datos al servidor:', error);
          console.log(this.requestHeaders);
          this.presentAlert("usuario inexistente", "");
        });

    } this.limpiar();
  };

  /* aca se manejan las imagenes de crear mangas*/
  imageSrc: any;
  ima: any;
  previewImage(event: any): void {    
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
        this.ima = file; // store the file object
        console.log('datos de la variable ima: '+this.ima);
      };
      reader.readAsDataURL(file);
    }
  };

  //aca recibe los mangas
  mangasDB: any = [];
  getMangas() {
    this.http.get('http://localhost:8080/api/mangas/list').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.mangasDB = response;
      }, (error) => { console.error('Error al obtener los mangas del servidor:', error); }
    )
  };

  //aca recibe el token
  token: any = [];
  tokenKey: any = '';

  requestHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tokenKey}`
  });

  requestHeadersM: HttpHeaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${this.tokenKey}`
  });

  //aca recibe los detalles del alquiler
  detallesDB: any = [];
  gHistorialDetalle: any = [];
  getHistorial() {
    axios.get('http://localhost:8080/api/details/list').then((response) => console.log('respuesta del detalle ' + response)).catch((response) => console.log('respuesta del detalle ' + response.data))
  };

  getHistorialF() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.tokenKey}`);
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:8080/api/details/list', { headers }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.detallesDB = response;
        /* aca se filtran los detalles*/
        this.gHistorialDetalle = this.detallesDB.filter((u: any) => u.idUserFK.idUsuario === this.idU);
        console.log(this.detallesDB);
      }
    )
  };

  /*funcion para alquilar un manga*/
  async alquilar(dat: any) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea alquilar este manga?',
      message: 'Despues de alquilarlo tendras 15 dias para devolverlo.',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (this.cargo === 'visitante') {
              this.presentAlert("No puedes alquilar un manga", "Si no te has registrado, ve al boton de arriba y registrate");
            }
            else {
              let fecha_actual = new Date();
              let year = fecha_actual.getFullYear();
              let month = (fecha_actual.getMonth() + 1).toString().padStart(2, '0');
              let day = fecha_actual.getDate().toString().padStart(2, '0');
            
              // Construye la fecha en el formato "A/M/D"
              let fecha = `${year}-${month}-${day}`;
              let fecha_devolucion = `${year}-${month}-${day+15}`;

              let manga = {
                fechaAlquiler: fecha,
                fechaDevolucion: fecha_devolucion,
                idMangaFK:{ idManga: dat.idManga},
                idUserFK:{ idUsuario:this.idU }
              }
              console.log('datos: \n'+manga.fechaAlquiler+'\n'+manga.fechaDevolucion+'\n'+manga.idMangaFK.idManga+'\n'+manga.idUserFK.idUsuario);

              /*metodo para enviar el id del manga y del usuario*/
              axios.post('http://localhost:8080/api/details/add', manga, { headers: { 'Content-Type': 'application/json' }})
              .then(response => {
                console.log('Respuesta del servidor:', response.data);
                this.presentAlert("Manga alquilado", "Disfruta de tu manga y no se te olvide devolverlo.");
              })
              .catch(error => {
                console.error('Error al intentar alquilar el manga:', error);
                this.presentAlert("Error al alquilar el manga", "Trabajamos para solucionarlo.");
              });
            
              this.getMangas();
            }
          }
        }], mode: 'ios'
    }); await alert.present();
  };

  /*aca esta la funcion para devolver manga*/
  devolver(dev: any) {
    let idDetail_ma = dev.idDetail_ma;
  
    // Realiza la solicitud PUT al servidor PHP
    axios.put(`http://localhost:8080/api/details/${idDetail_ma}`, {restore: true })
    .then(response => {
      console.log(idDetail_ma +' '+ this.idU);
      this.presentAlert("Manga devuelto", "Gracias por devolver el manga");
      console.log('Respuesta de devolver el manga:', response);
    })
    .catch(error => {
      this.presentAlert("Error al devolver el manga", "");
      console.error('Error al enviar el ID al servidor:', error);
    });
  
    this.getHistorialF();
    this.getMangas();
  }

  datsDetalle: any = [];
  detalle(dat:any){
    this.ventana = 'Detalle_card';

    const detalleObject = {
      title: dat.title,
      description: dat.description,
      img: dat.image,
      price: dat.price,
      amount: dat.amount
    };
    console.log(detalleObject)
    this.datsDetalle.push(detalleObject);
  }
  back(){
    this.datsDetalle.splice(0, this.datsDetalle.length);
    this.ventana = '';
  }
}