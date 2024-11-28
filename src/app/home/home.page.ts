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
  subjects: { title: string; code: string; registered: Date | null }[] = [];
  weatherData: any;
  result: string = ''; // Resultado del escaneo

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    const storedUserName = localStorage.getItem('userName');
    this.userName = storedUserName ? storedUserName : 'Usuario';
    this.subjects = [
      { title: 'Clase de Matemática', code: 'MAT2001', registered: null },
      { title: 'Clase de Lenguaje', code: 'LENG2001', registered: null },
      { title: 'Clase de Historia', code: 'HIS3005', registered: null },
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
    this.weatherService.getWeather(lat, lon).subscribe((data) => {
      this.weatherData = data;
    });
  }

  // Escanear código QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
    });

    const scannedText = result.ScanResult;

    if (scannedText && scannedText.includes('|')) {
      const [asignatura, seccion, sala, fecha] = scannedText.split('|');

      // Buscar la asignatura por su código
      const subject = this.subjects.find((subject) => subject.code === asignatura);
      if (subject) {
        subject.registered = new Date();

        // Crear un objeto para el historial
        const attendanceRecord = {
          asignatura: subject.title,
          seccion,
          sala,
          fechaEscaneo: new Date().toISOString(),
        };

        // Guardar en el localStorage
        const currentHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
        currentHistory.push(attendanceRecord);
        localStorage.setItem('attendanceHistory', JSON.stringify(currentHistory));

        alert(`Asistencia registrada para ${subject.title}`);
      } else {
        alert('Asignatura no encontrada en la lista.');
      }
    } else {
      alert('Formato de QR inválido.');
    }

    this.result = scannedText;
  }

  // Navegar a la página de historial
  viewHistory() {
    this.router.navigate(['/history']);
  }

  // Cerrar sesión
  handleLogout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
