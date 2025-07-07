import { Injectable } from '@angular/core';
import { Pessoa } from '../interfaces/Pessoa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private apiUrl = "https://projetolucasmorikawa.duckdns.org/cadastrados";

  constructor(private http: HttpClient) {}

  getPessoa(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}`);
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.apiUrl}`, pessoa);
  }

  delete(pessoa: Pessoa): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pessoa.id}`);
  }

  update(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

  getFavoritos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/favoritos`);
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

}