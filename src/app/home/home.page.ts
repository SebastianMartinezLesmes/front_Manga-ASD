import { HttpClient } from '@angular/common/http';
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
    private http:HttpClient, 
    private alertController: AlertController
  ){
    this.getUser();
    this.getMangas();
    this.getDetalles();
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
  number: any = [{id: 1},{id: 2},{id: 3},{id: 4}];

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
      axios.post('', manga)
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
      axios.post('', user)
      .then(response => {
        this.presentAlert ("Usuario creado exitosamente", "");
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        this.presentAlert ("Error al crear el usuario", "");
        console.error('Error al enviar el ID al servidor:', error);
      });

      this.getUser();
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
  
  login() {
    const inputUsername = this.email;
    const inputPassword = this.password;
    const user = this.usuariosDB.find((u: any) => u.email === inputUsername && u.password === inputPassword);

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
      if (user) {
        console.log(user.email+' '+user.password)
        this.cargo = user.role;
        this.ventana = '';
        this.idU = user.id_usuario;
        this.getHistorialF();
        this.presentAlert("usuario registrado", "ahora puedes alquilar tu manga");
      } else { this.presentAlert("usuario inexistente", ""); }
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

  //aca recibe los usuarios
  usuariosDB: any = [];
  getUser() {
    this.http.get('http://localhost:8080/api/users/list').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  //aca recibe los mangas
  mangasDB: any = [];
  getMangas() {
    this.http.get('http://localhost:8080/api/mangas/list').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.mangasDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  //aca recibe los detalles del alquiler
  detallesDB: any = [];
  getDetalles() {
    this.http.get('').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.detallesDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };
  gHistorialDetalle: any = [];
  getHistorialF() {
    this.http.get('').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.detallesDB = response;
        this.gHistorialDetalle = this.detallesDB.filter((u: any) => u.id_detail_ma === this.idU);
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
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
              id_manga: dat.id_manga,
              id_usuario: this.idU
            }
            console.log(manga.id_manga+' '+manga.id_usuario);
            this.getMangas();
            this.presentAlert ("Manga alquilado", "Disfruta de tu manga y no se te olvide devolverlo.");

            /*metodo para enviar el id del manga*/
            axios.post('', manga)
            .then(response => {
              console.log('Respuesta del servidor:', response.data);
            })
            .catch(error => {
              console.error('Error al enviar el ID al servidor:', error);
            });
          } 
        }
      }], mode: 'ios'
    });await alert.present();
  };

  /*aca esta la funcion para devolver manga*/
  devolver(dev:any){
    const id_detail_ma = dev.id_manga;
    console.log(id_detail_ma+' '+this.idU);

    // Realiza la solicitud POST al servidor PHP
    axios.post('', id_detail_ma)
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