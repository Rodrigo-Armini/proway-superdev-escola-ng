import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
  private urlApi: string;

  constructor(private http: HttpClient) { 
    this.urlApi = "http://localhost:8000/api/formacoes";
  }

  cadastrar(formacaoCadastro: FormacaoCadastro): Observable<any>{
    return this.http.post<any>(this.urlApi, formacaoCadastro);
  }

  obterTodos(): Observable<Array<Formacao>>{
    return this.http.get<Array<Formacao>>(this.urlApi);
  }

  apagar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  alterar(id: number, formacao: FormacaoCadastro): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${id}`, formacao);
  }
}
