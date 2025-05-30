import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FormacaoCadastro } from "./formacao-cadastro";

@Injectable({
    providedIn: 'root'
  })

export class Formacao {
    private urlApi: string;
    constructor(private http: HttpClient) {
        this.urlApi = "http://localhost:8000/api/formacoes";
    }

    cadastrar(formacaoCadastro: FormacaoCadastro): Observable<Formacao>{
        return this.http.post<Formacao>(this.urlApi, formacaoCadastro);
    }

    obterTodos(): Observable<Formacao[]> {
        return this.http.get<Formacao[]>(this.urlApi);
    }

    obterPorId(id: number): Observable<Formacao> {
        return this.http.get<Formacao>(`${this.urlApi}/${id}`);
    }

    apagar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.urlApi}/${id}`);
    }

    editar(id: number, formacaoEditar: FormacaoEditar): Observable<Formacao> {
        return this.http.put<Formacao>(`${this.urlApi}/${id}`, formacaoEditar);
    }
}
