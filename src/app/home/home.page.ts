// home.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
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
      { title: 'Matemáticas', registered: null },
      { title: 'Lenguaje', registered: null },
      { title: 'Historia', registered: null }
    ];
    this.getLocationAndWeather();
  }

  async getLocationAndWeather() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.getWeather(lat, lon);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      alert('No se pudo obtener la ubicación. Por favor, verifica los permisos de GPS.');
    }
  }

  getWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe(data => {
      this.weatherData = data;
    });
  }

  // Método para escanear el código QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult; 
    alert(`Código QR escaneado: ${this.result}`);
  }

  // Función para cerrar sesión
  handleLogout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
