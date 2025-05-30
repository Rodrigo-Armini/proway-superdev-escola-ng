import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormacaoService } from '../../../services/formacao.service';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Formacao } from '../../../models/formacao';

@Component({
  selector: 'app-formacao-lista',
  imports: [TableModule, 
    CommonModule, 
    ButtonModule, 
    ToastModule, 
    ConfirmDialogModule],
  templateUrl: './formacao-lista.component.html',
  styleUrl: './formacao-lista.component.css',
  providers: [MessageService, ConfirmationService]
})

export class FormacoesListaComponent implements OnInit {
  formacoes: Array<Formacao>;
  carregandoFormacoes?: boolean;

  constructor(
    private router: Router, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private formacaoService: FormacaoService,
  ) {
    this.formacoes = []
  }
  ngOnInit(): void {
    this.carregarFormacoes();
  }

  private carregarFormacoes() {
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: formacoes => this.formacoes = formacoes,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de formações:" + erro),
      complete: () => this.carregandoFormacoes = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/formacoes/cadastro"])
  }

  redirecionarEditar(idFormacao: number){
    this.router.navigate(["formacoes/editar/" + idFormacao])
  }

  redirecionarCadastrar() {
    this.router.navigate(["formacoes/cadastro"])
  }

  confirmarParaEditar(idFormacao: number){
    this.router.navigate(["formacoes/editar/" + idFormacao])
  }

  confirmarParaApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'danger'
      },
      accept: () => this.apagar(id)
    });
  }

  private apagar(id: number){
    this.formacaoService.apagar(id).subscribe({ 
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar a formação: ${erro}`),
    })
  }

  private apresentarMensagemApagado(){
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Sucesso', 
      detail: 'Formação removida com sucesso',
     });
    this.carregarFormacoes();
  }

}
