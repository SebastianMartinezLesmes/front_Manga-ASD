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

    this.ima = '';
    this.imageSrc = '';
  };

  
  
  mostrarManga() { this.ventana = ''; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarManga_ADMIN() { this.ventana = 'card_admin'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarregistro() { this.ventana = 'registro'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarCrearUsuario() { this.ventana = 'crear_usuario'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarUsuarios(){ this.ventana = 'ver_usuarios'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarCrearManga() { this.ventana = 'crear_manga'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}
  mostrarMisMangas() { this.ventana = 'mis_manga'; this.changeList(); this.datsDetalle.splice(0, this.datsDetalle.length);}

  mostrarCarrito() { 
    this.ventana = 'carrito';
    if(this.carro.length === 0){
      this.presentAlert("No tienes nada en el carro, alquila o añade mangas a tu carro antes de que se acaben", "");
    };
  }

  questInto() {
    if (this.cargo === '' || this.cargo === ' ') {
      this.cargo = 'visitante';
    }
  }

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
  };

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
      console.log('\nima:'+this.ima+ '\n'+this.ima);

      let mangaFormData = new FormData();
      mangaFormData.append('title', this.title);
      mangaFormData.append('description', this.description);
      mangaFormData.append('amount', this.cant.toString());
      mangaFormData.append('price', this.price.toString());
      mangaFormData.append('file', this.ima);  // Asegúrate de que this.ima sea un File

      console.log('mangaFormData:\n'+mangaFormData);

      /* Aquí la función para crear el manga */
      axios.post('http://localhost:8080/api/mangas/add', mangaFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.tokenKey}`
        }
      }).then(response => {
        this.presentAlert("Manga creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
        this.limpiar();
        this.getMangas();
      }).catch(error => {
        this.presentAlert("Error al crear el manga", "");
        console.error('Error al crear el manga,', error);
      });
    }
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
        this.getUser();
        this.limpiar();
        this.mostrarUsuarios();
      }).catch(error => {
        this.presentAlert("Error al crear el usuario", "");
        console.error('Error al enviar el ID al servidor:', error);
      });
    } 
  };

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

          this.getHistorialF();

          if( this.cargo === 'administrador' ){ 
            this.mostrarManga_ADMIN();
            this.presentAlert("usuario registrado", "ahora puedes administrar la paguina"); this.getUser();
          }
          else{ 
            this.mostrarManga();
            this.presentAlert("usuario registrado", "ahora puedes alquilar tu manga"); 
          }
          this.changeList();
          //requestHeaders
          console.log(this.requestHeaders);
          console.log('aca esta el token: ' + this.tokenKey);

        })
        .catch(error => {
          console.error('Error al enviar datos al servidor:', error);
          console.log(this.requestHeaders);
          this.presentAlert("usuario inexistente", "");
        });
    } 
    this.limpiar();
    this.list = 'false';
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
  getHistorialF() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.tokenKey}`);
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:8080/api/details/list', { headers }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.detallesDB = response;
        console.log(this.detallesDB);
        /* aca se filtran los detalles*/
        this.gHistorialDetalle = this.detallesDB.filter((u: any) => u.idUserFK.idUsuario === this.idU);
        console.log(this.detallesDB);
      }
    )
  };

  /* aca ser resiven los usuarios*/

  usuariosDB: any= [];
  getUser() {
    this.http.get('http://localhost:8080/api/users/list').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
        console.log(this.usuariosDB);
      },(error) => { console.error('Error al obtener datos del servidor:', error); }
    )
  };

/*funcion para alquilar un manga*/
  async alquilar(info: any) {
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
              let dayBack = (fecha_actual.getDate()+15).toString().padStart(2, '0');
            
              // Construye la fecha en el formato "A/M/D"
              let fecha = `${year}-${month}-${day}`;
              let fecha_devolucion = `${year}-${month}-${dayBack}`;

              let manga = [{
                fechaAlquiler: fecha,
                fechaLimite: fecha_devolucion,
                idMangaFK:{ idManga: info.idManga},
                idUserFK:{ idUsuario:this.idU }
              }]
              console.log('datos: \n'+manga[0].fechaAlquiler+'\n'+manga[0].fechaLimite+'\n'+manga[0].idMangaFK.idManga+'\n'+manga[0].idUserFK.idUsuario);

/*metodo para alquilar el manga*/
              axios.post('http://localhost:8080/api/details/add', manga, { headers: 
              { 'Content-Type': 'application/json' }}
              ).then(response => {
                console.log('Respuesta del servidor:', response.data);
                this.presentAlert("Manga alquilado", "Disfruta de tu manga y no se te olvide devolverlo.");
                this.getHistorialF();
                this.getMangas();
              })
              .catch(error => {
                console.error('Error al intentar alquilar el manga:', error);
                this.presentAlert("Error al alquilar el manga", "Trabajamos para solucionarlo.");
              });
              this.getHistorialF();
              this.getMangas();
            }
          }
        }], mode: 'ios'
    }); await alert.present();
  };

  carro:any[] = [];
  agregarCarro(info:any){
    if(this.cargo === 'visitante'){
      this.presentAlert("Error al agragar al carro", "registrate primero.");
    }
    else{
      this.presentAlert("Añadido al carro con exito", "");
      let fecha_actual = new Date();
      let year = fecha_actual.getFullYear();
      let month = (fecha_actual.getMonth() + 1).toString().padStart(2, '0');
      let day = fecha_actual.getDate().toString().padStart(2, '0');
      let dayBack = (fecha_actual.getDate()+15).toString().padStart(2, '0');
    
      // Construye la fecha en el formato "A/M/D"
      let fecha = `${year}-${month}-${day}`;
      let fecha_devolucion = `${year}-${month}-${dayBack}`;

      let manga = {
        fechaAlquiler: fecha,
        fechaLimite: fecha_devolucion,
        idMangaFK:{ idManga: info.idManga},
        idUserFK:{ idUsuario:this.idU }
      }
      console.log('datos: \n'+manga.fechaAlquiler+'\n'+manga.fechaLimite+'\n'+manga.idMangaFK.idManga+'\n'+manga.idUserFK.idUsuario);
        
      console.log('Array del carro: \n'+this.carro);
      console.log(manga);
      this.carro.push(manga);
    }
  };

  alquilarCarro(){
    /*metodo para alquilar el manga*/
    if(this.carro.length !== 0){
    axios.post('http://localhost:8080/api/details/add', this.carro, { headers: 
    { 'Content-Type': 'application/json' }}
    ).then(response => {
      console.log('Respuesta del servidor:', response.data);
      this.presentAlert("Mangas alquilado", "Disfruta de tu manga y no se te olvide devolverlo.");
      this.getHistorialF();
      this.getMangas();
    })
    .catch(error => {
      console.error('Error al intentar alquilar el manga:', error);
      this.presentAlert("Error al alquilar el manga", "Trabajamos para solucionarlo.");
    });
    }
    else{ this.presentAlert("Error al alquilar los mangas", "no tienes nada en el carrito."); }
  }

  borrarCarro(i: number){
    console.log(i);
    this.carro.splice(i, 1); // Elimina 1 elemento en la posición i
  }

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

    if(this.cargo ==='administrador'){
      this.ventana = 'Detalle_card_admin';
    }
    else{
      this.ventana = 'Detalle_card';
    }

    const detalleObject = {
      idManga : dat.idManga,
      title: dat.title,
      description: dat.description,
      img: dat.image,
      price: dat.price,
      amount: dat.amount
    };
    console.log('detalleObject'+ this.datsDetalle)
    this.datsDetalle.push(detalleObject);
  }
  back(){

    if(this.cargo ==='administrador'){
      this.ventana = 'card_admin';
    }
    else{
      this.ventana = '';
    }
    this.datsDetalle.splice(0, this.datsDetalle.length);
  }
}