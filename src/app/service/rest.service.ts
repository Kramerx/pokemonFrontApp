import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { serviceUrl } from '../util/uitl';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${serviceUrl}/?idAuthor=1`).pipe(catchError(this.handleError));
  }

  getPokemonById(id: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${serviceUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return pokemon.id ?
      this.http.put<Pokemon>(`${serviceUrl}/${pokemon.id}`, pokemon).pipe(catchError(this.handleError)) :
      this.http.post<Pokemon>(`${serviceUrl}/?idAuthor=${pokemon.idAuthor}`, pokemon).pipe(catchError(this.handleError))
  }

  deletePokemon(id: number): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${serviceUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      console.error(`Code: ${error.status}, Body: `, error.error);
    }
    return throwError(() => new Error('Se ha producido un error. Intentar más tarde'));
  }
}
