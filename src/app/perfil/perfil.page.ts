import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = '';  
  email: string = '';  
  phone: string = '';  
  address: string = '';  
  profilePicture: string = 'assets/img/default-avatar.png';  // Imagen predeterminada
  gameImages: string[] = [];  // Lista de imágenes de los juegos
  showImageOptionsModal: boolean = false; // Variable para mostrar el modal de opciones de imágenes

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    // Cargar nombre de usuario y datos desde localStorage
    const savedUsername = localStorage.getItem('userName');
    if (savedUsername) {
      this.username = savedUsername;
    }

    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      this.email = savedEmail;
    }

    const savedPhone = localStorage.getItem('phone');
    if (savedPhone) {
      this.phone = savedPhone;
    }

    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      this.address = savedAddress;
    }

    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      this.profilePicture = savedImage;
    }

    // Llamada al servicio para obtener imágenes del juego
    this.gameService.getGames('elden ring').subscribe((response: any) => {
      this.gameImages = response.results.map((game: any) => {
        return game.background_image;  
      });
    });
  }

  // Método para guardar cambios del perfil
  saveProfile() {
    console.log('Perfil guardado:', { username: this.username, email: this.email, phone: this.phone, address: this.address, profilePicture: this.profilePicture });
    
    // Guardar los datos en localStorage
    localStorage.setItem('userName', this.username);
    localStorage.setItem('email', this.email);
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('address', this.address);
    localStorage.setItem('profilePicture', this.profilePicture);

    alert('Cambios guardados correctamente');
  }

  // Método para cambiar la foto de perfil
  changeProfilePicture(image: string) {
    this.profilePicture = image;  
    localStorage.setItem('profilePicture', image); 
    this.showImageOptionsModal = false; 
  }

  // Método para navegar al Home
  goToHome() {
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
  
  showImageOptions() {
    this.showImageOptionsModal = true; 
  }
}
