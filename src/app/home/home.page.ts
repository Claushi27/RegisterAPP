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
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      });

      if (result.ScanResult) {
        this.result = result.ScanResult; 
        const [asignatura, seccion, sala, fecha] = this.result.split('|');

        if (!asignatura || !seccion || !sala || !fecha) {
          alert(
            'El formato del QR es inválido. Asegúrate de que siga el formato: <ASIGNATURA>|<SECCION>|<SALA>|<FECHA>'
          );
          return;
        }

        const subject = this.subjects.find((s) => s.code === asignatura);

        if (subject) {
          subject.registered = new Date(); // Registrar asistencia
          alert(`Asistencia registrada para: ${subject.title}`);
        } else {
          alert('El QR no corresponde a ninguna asignatura disponible.');
        }
      } else {
        alert('No se pudo leer el QR. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      alert('Hubo un problema al escanear el QR.');
    }
  }

  // Cerrar sesión
  handleLogout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
