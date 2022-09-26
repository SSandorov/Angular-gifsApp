import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  /* El @ViewChild es un decorador que nos permite acceder a todo el contenido de un
  elemento HTML, y nos permite interactuar y manipular su contenido.
  A diferencia del ngModel, que nos permite manipular el valor de un elemento
  HTML, el decorador @ViewChild nos permite manipular cualquier elemento
  */
  @ViewChild("txtBuscar") txtbuscar!:ElementRef<HTMLInputElement>;

  constructor (private gifsService: GifsService) {}

  buscar() {
    let valor = this.txtbuscar.nativeElement.value;

    //Los elementos vacíos no se muestran en pantalla
    if(valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtbuscar.nativeElement.value = "";
  }

}
