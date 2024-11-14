import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importa el servicio de autenticación

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  storedPassword: string | null = ''; // Variable para mostrar la contraseña recuperada

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Añadir email al formulario
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Lógica para verificar si hay una contraseña almacenada
    const username = this.resetPasswordForm.value.username;
    if (username) {
      this.storedPassword = localStorage.getItem(username);
    }
  }

  async onResetPassword() {
    const username = this.resetPasswordForm.value.username;
    const email = this.resetPasswordForm.value.email;  // Obtener email del formulario
    if (this.resetPasswordForm.valid) {
      // Recupera la contraseña desde localStorage usando el nombre de usuario
      this.storedPassword = localStorage.getItem(username);
      if (this.storedPassword) {
        try {
          await this.authService.resetPassword(email);  // Usar AuthService para enviar el email de restablecimiento
          alert(`Tu contraseña es: ${this.storedPassword}. Se ha enviado un correo para restablecer la contraseña.`); 
        } catch (error) {
          console.error('Reset password error:', error);
          alert('Failed to reset password. Please try again.');
        }
      } else {
        alert('No se encontró una contraseña para este usuario.');
      }
      this.router.navigate(['/login']);
    }
  }
}
