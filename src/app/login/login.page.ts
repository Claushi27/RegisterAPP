import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    // Definir el formulario con las validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
        ]
      ]
    });
  }

  // Método para manejar el login (solo guarda datos)
  async onLogin() {
    if (this.loginForm.valid) {
      const { email, username, password } = this.loginForm.value;
      console.log('Datos recibidos en onLogin:', { email, username, password });  // Agregar log
  
      try {
        // Guarda los datos del usuario en Firestore
        await this.authService.saveUserData(email, username, password);
        console.log('Datos guardados en Firebase correctamente');  // Agregar log
  
        // Guarda los datos del usuario en localStorage
        localStorage.setItem('userName', username);
        localStorage.setItem('userEmail', email);
  
        alert('Inicio de sesión exitoso');
        
        // Redirige al home
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        alert('Ocurrió un error al guardar los datos del usuario. Inténtalo nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
