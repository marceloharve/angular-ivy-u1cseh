import { Component, OnInit } from '@angular/core';
import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { DadosAulaService } from '../dados-aula.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Desafio } from '../desafio';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-aula1',
  templateUrl: './aula1.component.html',
  styleUrls: ['./aula1.component.css']
})
export class Aula1Component implements OnInit {
  botaoatual = 0;
  divvideo = true;
  divboasvindas = false;
  divcp = false;
  divrevisao = false;
  divdesafio = false;
  divrespotacorreta = false;
  classeresposta = 'respostaerrada';
  aulaatual = '';
  divControles = false;

  revisaoatual = '';
  boasvindas : SafeHtml;
  cp = '';
  respostaCorreta = 0;
  respostausuario = '';
  respostas: string[];
  textosetup = '';
  videoatual: SafeResourceUrl;
  perguntaatual = '';

  setup = false;
  id: number;


  constructor(public dados: DadosAulaService, private route: ActivatedRoute,private domSanitizer:DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.dados.selecionatopico(this.id);
      this.imprimiraula();
    });
  }

  ngOnInit() {}

  defineControles() {
    if (this.botaoatual == 0) {
      this.videoclick();
    } else {
      if (this.botaoatual == 1) {
        this.revisaoclick();
      } else {
        this.desafioclick();
      }
    }
    this.divControles = true;
  }

  imprimiraula() {
    this.boasvindas = this.dados.getBoasVindasAtual();
    this.cp = this.dados.getCPAtual();
    this.aulaatual = this.dados.getAulaAtual();
    console.log(this.boasvindas);
    if (this.dados.hasBoasVindas()) {
      this.defineboasvindas();
      this.divControles = false;
    } else {
      if (this.dados.hasCP()) {
        this.defineCP();
        this.divControles = false;
      } else {
        this.defineControles();
        this.revisaoatual = this.dados.getRevisaoAtual();
        this.videoatual = this.dados.getVideoAtual();

        this.perguntaatual = this.dados.getPerguntaAtual();
        let desafio: Desafio = this.dados.getAtual().desafio;
        if (desafio != undefined) {
          this.respostaCorreta = desafio.respostacerta;
          this.respostas = desafio.respostas;
          this.setup = this.dados.hasSetup();
          this.textosetup = desafio.setup;
        }
      }
    }
  }

  videoclick() {
    this.divdesafio = false;
    this.divrevisao = false;
    this.divvideo = true;
    this.divboasvindas = false;
    this.divcp = false;
    this.botaoatual = 0;
  }

  revisaoclick() {
    this.divdesafio = false;
    this.divrevisao = true;
    this.divvideo = false;
    this.divboasvindas = false;
    this.divcp = false;
    this.botaoatual = 1;
  }

  desafioclick() {
    this.divdesafio = true;
    this.divrevisao = false;
    this.divvideo = false;
    this.divboasvindas = false;
    this.divcp = false;
    this.botaoatual = 2;
  }

  limpar() {
    this.revisaoatual = '';
    this.boasvindas = '';
    this.respostaCorreta = 0;
    this.respostausuario = '';
    this.respostas = undefined;
    this.textosetup = '';
    this.videoatual = undefined;
    this.perguntaatual = '';
    this.divControles = false;
    this.divcp = false;
  }

  defineboasvindas() {
    this.divdesafio = false;
    this.divrevisao = false;
    this.divvideo = false;
    this.divboasvindas = true;
    this.divcp = false;
  }

  defineCP() {
    this.divdesafio = false;
    this.divrevisao = false;
    this.divvideo = false;
    this.divboasvindas = false;
    this.divcp = true;
  }

  continuar() {
    if (this.divvideo) {
      this.revisaoclick();
    } else {
      if (this.divrevisao) {
        this.desafioclick();
      } else {
        this.dados.proximotopico();
        this.videoclick();
        this.imprimiraula();
      }
    }
  }

  radioChange(event) {
    this.divrespotacorreta = true;
    if (event.value == this.respostas[this.respostaCorreta]) {
      this.classeresposta = 'respostacerta';
    } else {
      this.classeresposta = 'respostaerrada';
    }
  }
}
