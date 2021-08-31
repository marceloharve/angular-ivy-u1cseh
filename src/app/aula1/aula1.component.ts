import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DadosAulaService } from '../dados-aula.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-aula1',
  templateUrl: './aula1.component.html',
  styleUrls: ['./aula1.component.css']
})

export class Aula1Component implements OnInit {
  divvideo = true;
  aulaatual = "";
  revisaoatual = "";
  videoatual : SafeResourceUrl;
  perguntaatual = ""
  divrevisao = false;
  divdesafio = false;
  divrespotacorreta = false;
  classeresposta = 'respostaerrada';
  setup = false;
  respostaCorreta = 0;
  respostausuario = '';
  respostas: string[];
  textosetup = "";
  id : number;

  constructor(public dados : DadosAulaService,private route: ActivatedRoute,
    ) {
      this.route.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
        this.dados.selecionatopico(this.id);
        this.imprimiraula();
        console.log('foi'+this.id.toString());
        
      });
      
  }

  ngOnInit() {


  }

  imprimiraula()
  {
    this.aulaatual = this.dados.getAulaAtual();
    this.revisaoatual = this.dados.getRevisaoAtual();
    this.videoatual = this.dados.getVideoAtual();
    this.perguntaatual = this.dados.getPerguntaAtual();
    this.respostaCorreta = this.dados.getAtual().desafio.respostacerta;
    this.respostas = this.dados.getAtual().desafio.respostas;
    this.setup = this.dados.hasSetup();
    this.textosetup = this.dados.getAtual().desafio.setup;
  }

  videoclick() {
    this.divdesafio = false;
    this.divrevisao = false;
    this.divvideo = true;
  }

  revisaoclick() {
    this.divdesafio = false;
    this.divrevisao = true;
    this.divvideo = false;
  }

  desafioclick() {
    this.divdesafio = true;
    this.divrevisao = false;
    this.divvideo = false;
  }

  continuar()
  {
    if(this.divvideo){
      this.revisaoclick();
    }
    else
    {
      if(this.divrevisao){
        this.desafioclick();
      }
      else
      {
        this.dados.proximaAula(); 
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
