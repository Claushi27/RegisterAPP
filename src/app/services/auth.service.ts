import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore // Inject Firestore
  ) {}

  // Register a new user using Firebase Authentication
  async registerUser(email: string, password: string, username: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario registrado exitosamente', userCredential.user);
      
      // Verificar si userCredential.user no es null antes de acceder a user.uid
      const user = userCredential.user;
      if (user) {
        await this.afs.collection('users').doc(user.uid).set({
          email: email,
          username: username,
        });
      }

      return userCredential.user;
    } catch (error) {
      throw error; // Lanza el error si ocurre algún problema durante el registro
    }
  }
  
  
  
  resetPassword(email: string) {
    return Promise.resolve();
  }

  
  

  login(email: string, password: string) {
    // Sólo simula el login, no hace ninguna verificación real
    return new Promise((resolve, reject) => {
      if (email && password.length >= 5 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password)) {
        resolve({ success: true });
      } else {
        reject({ error: 'Credenciales inválidas' });
      }
    });
  }


  // Get the currently authenticated user
  async getUser(): Promise<any> {
    const user = await this.afAuth.currentUser;
    return user;
  }

  // Logout the user
  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  // Send password reset email
  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      console.error('Error al enviar enlace de restablecimiento:', error);
      throw error; // Lanza el error para manejarlo en el componente
    });
  }
}
