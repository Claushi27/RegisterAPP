import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  passwordResetSuccess: boolean = false;
  passwordResetError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Función para manejar el restablecimiento de la contraseña
  async onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { email } = this.resetPasswordForm.value;

      try {
        // Llamamos al servicio de restablecimiento de contraseña
        await this.authService.resetPassword(email);
        this.passwordResetSuccess = true;
        this.passwordResetError = false;
        this.successMessage = 'Se ha enviado un correo para restablecer tu contraseña.';

        // Redirigir al usuario al login después de un éxito
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirigir después de 2 segundos
      } catch (error) {
        console.error('Error al enviar correo de restablecimiento:', error);
        this.passwordResetError = true;
        this.passwordResetSuccess = false;
        this.errorMessage = 'No se pudo enviar el correo de restablecimiento. Intenta nuevamente.';
      }
    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  }
}
