import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    this.questInto();
  }

  list:string = 'false';
  cargo: string = '';

  name: string = '';
  lastName: string = '';
  celular: string = '';
  otherName: string = '';
  email: string = '';
  password: string = '';  

  ventana: string = '';
  number: any = [{},{},{},{}];

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
  questInto(){
    if(this.cargo === ''|| this.cargo === ' '){
      this.cargo ='visitante'
    } 
  }

  usuariosDB: any = [];
  getUser() {
    this.http.get('').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  crearManga(){
    console.log(this.title+' '+this.description+' '+this.cant+' '+this.price)
    console.log(this.imageSrc)
    this.limpiar();
  };

   async crearUsuario(){
    console.log('Datos del usuario:', {
      name: this.name = this.name,
      lastName: this.lastName = this.lastName,
      email: this.email = this.email,
      celular: this.celular = this.celular,
      otherName: this.otherName = this.otherName,
      password: this.password = this.password,
    })
  };

  changeList() {
    if (this.list === 'true') {
      this.list = 'false';
    } else if (this.list === 'false') {
      this.list = 'true';
    }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    })
  }
  
  login() {
    const inputUsername = this.email;
    const inputPassword = this.password;
    console.log(inputUsername+' '+inputPassword)
    const user = this.usuariosDB.find((u: any) => u.numeroTI === inputUsername && u.credenciales === inputPassword);

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
        this.cargo = user.role
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
}
