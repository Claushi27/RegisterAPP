import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { HomePage } from './home/home.page';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

// Importar Firebase y el módulo de autenticación
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    ResetPasswordPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialización de Firebase con la configuración
    AngularFireAuthModule,
    AngularFireAuthModule, // Módulo de autenticación de Firebase
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WeatherService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
