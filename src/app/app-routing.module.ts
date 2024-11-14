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

  // Ruta protegida para Perfil (agregado el AuthGuard)
  { 
    path: 'perfil', 
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard] // Protege la ruta de perfil
  },

  // Ruta para el error 404
  { 
    path: '**', 
    redirectTo: 'e404', 
    pathMatch: 'full' 
  },

  // Componente de error 404
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
