import { Injectable, OnInit } from '@angular/core';
import * as data from './_files/analytics.json';
import { Curso } from './curso';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class DadosAulaService implements OnInit {
  [x: string]: any;
  _curso: Curso = (data as any).default;

  constructor(private sanitizer: DomSanitizer) {

    this._curso.aulas[0].atual = true;
    this._curso.aulas[0].topicos[0].atual = true;
    this._curso.aulas[0].topicos.forEach(p =>{
      p.checked = false;
    });
  }

  ngOnInit() {}

  getRevisaoAtual() {
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {

      return item.revisao;
    } else {
      return '';
    }
  }

  
  getBoasVindasAtual() {
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {

      return item.MensagemBoasVindas;
    } else {
      return null;
    }

  }

  getCPAtual(){
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {

      return item.CP;
    } else {
      return '';
    }

  }

  hasBoasVindas()
  {
    let _aulaAtual = this.getAtual();
    console.log('msg boas vindas');
    console.log(_aulaAtual.MensagemBoasVindas);
    if (_aulaAtual.MensagemBoasVindas == undefined) {
      return false;
    } else {
      return true;
    }
  }

  hasCP()
  {
    let _aulaAtual = this.getAtual();
    if (_aulaAtual.CP == undefined) {
      return false;
    } else {
      return true;
    }
  }

  getAulaAtual() {
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {
      return item.nome;
    } else {
      return '';
    }
  }

  getVideoAtual() {
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(item.video);
    } else {
      return '';
    }
  }

  getPerguntaAtual() {
    let item = this._curso.aulas[0].topicos.find(p => p.atual == true);

    if (item != null) {
      if(item.desafio != undefined)
        return item.desafio.pergunta;
      else
      { return ''}
    } else {
      return '';
    }
  }
  

  getAtual() {
    return this._curso.aulas[0].topicos.find(p => p.atual == true);
  }

  proximaAula() {
    let indice = this._curso.aulas[0].topicos.findIndex(p => p.atual == true);
    if (indice + 1 <= this._curso.aulas[0].topicos.length) {
      this._curso.aulas[0].topicos[indice].atual = false;
      this._curso.aulas[0].topicos[indice].checked = true;
      this._curso.aulas[0].topicos[indice + 1].atual = true;

    }
  }

  selecionatopico(idTopicoAula)
  {
    console.log(idTopicoAula);
    let _indice = this._curso.aulas[0].topicos.findIndex(p => p.idTopicoAula == idTopicoAula );
    if (_indice => 0) {
      this._curso.aulas[0].topicos.forEach(t => t.atual = false);
      this._curso.aulas[0].topicos[_indice].atual = true;

    }    
  }

  hasSetup() {
    let _aulaAtual = this.getAtual();
    if (_aulaAtual.desafio.setup == '') {
      return false;
    } else {
      return true;
    }
  }

  quantidadevistas()
  {
    let aulascheckada = this._curso.aulas[0].topicos.filter(p => p.checked == true).length;
    return  (aulascheckada/this._curso.aulas[0].topicos.length)*100;
  }
}
