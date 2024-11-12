import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  subjects: { title: string, registered: Date | null }[] = [];
  weatherData: any;
  result: string = ''; // Variable para almacenar el resultado del escaneo

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    const storedUserName = localStorage.getItem('userName');
    this.userName = storedUserName ? storedUserName : 'Usuario';
    this.subjects = [
      { title: 'Clase de Matemática', registered: null },
      { title: 'Clase de Lenguaje', registered: null },
      { title: 'Clase de Historia', registered: null }
    ];
    this.getWeather('Santiago');
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
    });
  }

  // Método para escanear el código QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult; // Almacena el resultado del escaneo
    alert(`Código QR escaneado: ${this.result}`);
  }

  // Función para cerrar sesión
  handleLogout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
