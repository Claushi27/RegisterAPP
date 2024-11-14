// game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';  // URL base de RAWG API

  constructor(private http: HttpClient) {}

  // Método para obtener juegos relacionados con una búsqueda
  getGames(query: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        key: '2750352f5ebb4f04879cd21f270cb118',  // Reemplaza con tu clave de API de RAWG
        page_size: '8',  // Cantidad de resultados por página
        search: query  // Búsqueda de juegos por nombre
      }
    });
  }
}
