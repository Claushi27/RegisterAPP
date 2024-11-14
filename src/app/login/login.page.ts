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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, username, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        localStorage.setItem('userName', username); // Guarda el nombre de usuario
        localStorage.setItem(username, password); // Guarda la contraseña usando el nombre de usuario como clave
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
