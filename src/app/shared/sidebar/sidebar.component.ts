import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  /*Traemos el array de strings del servicio de Gifs, luego en la
  parte dle HTML leemos los elementos del array y los presentamos en el 
  sidebar */
  get historial() {
    return this.gifsService.historial;
  }

  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
  }
}
