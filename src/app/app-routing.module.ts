import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'reset-password', component: ResetPasswordPage },

  // Ruta protegida para el Home
  { 
    path: 'home', 
    component: HomePage, 
    canActivate: [AuthGuard] 
  },

  // Ruta para el error 404
  { 
    path: '**', 
    redirectTo: 'e404',
    pathMatch: 'full'
  },

  {
    path: 'e404',
    loadChildren: () => import('./page/e404/e404.module').then(m => m.E404PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
