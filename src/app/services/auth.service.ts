import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';  
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar correctamente AngularFirestore

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inyectar AngularFirestore en el constructor
  constructor(private afAuth: AngularFireAuth, 
              private router: Router,
              private firestore: AngularFirestore) { }

  // Método para guardar los datos del usuario en Firebase Firestore
  saveUserData(email: string, username: string, password: string): Promise<any> {
    console.log('Guardando datos en Firestore:', { email, username, password });  // Agregar log
    return this.firestore.collection('users').add({
      email,
      username,
      password
    }).then(response => {
      console.log('Respuesta de Firestore:', response);  // Agregar log
    }).catch(error => {
      console.error('Error al guardar los datos:', error);
      throw error;
    });
  }
  

  // Enviar correo de restablecimiento de contraseña
  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo de restablecimiento enviado');
      })
      .catch(error => {
        console.error('Error al enviar correo de restablecimiento:', error);
        throw error;
      });
  }
}
