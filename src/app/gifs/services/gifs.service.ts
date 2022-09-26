import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  /*   
  Una vez cogida la API, empleamos postman para trastear con la url de ejemplo.
  En la página de GIPHY tenemos la documentación con todos los valores necesarios
  para emplear la API, y con postman vamos probando como funciona
  */
  private apiGifsKey: string = "46MHltr9bSHsbKdzLQmpMCDv46jCncyh";
  private servicioURL: string = "https://api.giphy.com/v1/gifs";

  private _historial: string[] = [];

  // el tipo Gif viene de la interfaz SearchGifsResponse
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  // Constructor que añade el módulo de http
  constructor(private http: HttpClient) {

    /*
    Cargamos el local storage cuando se abre la página
    A diferencia del almacenamiento en el local storage, cuando vamos
    a descargarlo en la página, tenemos que emplear el método opuesto,
    este es JSON.parse
    */
   /*
    if (localStorage.getItem("historial")) {
      this._historial = JSON.parse(localStorage.getItem("historial")!)
      }
      Esto es una forma, la más cómoda es
    */
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    /*
    Añadimos el signo de exclamación porque el tipado extricto no nos
    permite esta combinación, ya que puede devolver un string o un null
    */
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

  }

  buscarGifs( query: string) {

    /*
    Quitamos los espacios en blanco del string, y ponemos
    todas las letras en minúscula, así no añadimos al array dos
    elementos iguales
    */
    query = query.trim().toLowerCase();
    // Si el array no contiene el mismo string, devúelvelo y córtalo
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      //solo cogemos 10 elementos
      this._historial = this._historial.splice(0, 10);

      // Grabar en la memoria local
      localStorage.setItem("historial", JSON.stringify(this._historial));
      /*
      El JSON.stringify nos permite crear un string de un array, ya que el método
      setItem sólo nos permite añadir strings, y si queremos guardar en memoria más
      de una sola respuesta, necesitamos el JSON.stringify
      */
    }

    /*
    De esta manera empleamos la API
    Con la importación de HttpParams podemos ordenar la url de la API como en postman,
    dejando el código más limpio
    */
    const params = new HttpParams()
    .set("api_key", this.apiGifsKey)
    .set("limit", "10")
    .set("q", query);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    /*
    Con el resp: any lo que queremos es poder construir todo antes de crear la
    interfaz con quicktype. Una vez construído ya podemos aplicar el tipado estricto
    */
    .subscribe((resp) => {
      this.resultados = resp.data;
      //Almacenamos en memoria los resultados
      localStorage.setItem("resultados", JSON.stringify(this.resultados));
    });

    
  }
}
