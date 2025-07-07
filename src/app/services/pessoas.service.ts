import { Injectable } from '@angular/core';
import { Pessoa } from '../interfaces/Pessoa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) { }

  getPessoa() : Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>("http://localhost:8080/cadastrados");
  }


  save(pessoa:Pessoa){;

    return this.http.post<Pessoa>("http://localhost:8080/cadastrados", pessoa);
  }

  delete(pessoa:Pessoa){;

    return this.http.delete<void>(`http://localhost:8080/cadastrados/${pessoa.id}`);
  }

  update(id: number, pessoa: Pessoa) {
    return this.http.put(`http://localhost:8080/cadastrados/${id}`, pessoa);
  }

  getFavoritos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>("http://localhost:8080/cadastrados/favoritos");
  }
  
  updatePessoa(id: number, pessoa: Pessoa) {
    return this.http.put(`http://localhost:8080/cadastrados/${id}`, pessoa);
  }

  
}
