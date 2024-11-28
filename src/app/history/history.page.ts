import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  attendanceHistory: { asignatura: string; seccion: string; sala: string; fechaEscaneo: string }[] = [];

  constructor() {}

  ngOnInit() {
    // Cargar el historial desde el localStorage
    const savedHistory = JSON.parse(localStorage.getItem('attendanceHistory') || '[]');
    this.attendanceHistory = savedHistory;
  }
}
