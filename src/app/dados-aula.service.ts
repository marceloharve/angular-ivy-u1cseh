import { Injectable, OnInit } from '@angular/core';
import * as data from './_files/analytics.json';
import { Aula } from './aula';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class DadosAulaService implements OnInit {
  [x: string]: any;
  _analytics: Aula = (data as any).default;
  constructor(private sanitizer: DomSanitizer) {
    console.log('rr');
    console.log(this._analytics);
    this._analytics.atual = true;
    this._analytics.topicos[0].atual = true;
    this._analytics.topicos.forEach(p =>{
      p.checked = false;
    });
  }

  ngOnInit() {}

  getRevisaoAtual() {
    let item = this._analytics.topicos.find(p => p.atual == true);

    if (item != null) {

      return item.revisao;
    } else {
      return '';
    }
  }

  getAulaAtual() {
    let item = this._analytics.topicos.find(p => p.atual == true);

    if (item != null) {
      return item.nome;
    } else {
      return '';
    }
  }

  getVideoAtual() {
    let item = this._analytics.topicos.find(p => p.atual == true);

    if (item != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(item.video);
    } else {
      return '';
    }
  }

  getPerguntaAtual() {
    let item = this._analytics.topicos.find(p => p.atual == true);

    if (item != null) {
      return item.desafio.pergunta;
    } else {
      return '';
    }
  }

  getAtual() {
    return this._analytics.topicos.find(p => p.atual == true);
  }

  proximaAula() {
    let indice = this._analytics.topicos.findIndex(p => p.atual == true);
    if (indice + 1 <= this._analytics.topicos.length) {
      this._analytics.topicos[indice].atual = false;
      this._analytics.topicos[indice].checked = true;
      this._analytics.topicos[indice + 1].atual = true;

    }
  }

  selecionatopico(idTopicoAula)
  {
    console.log(idTopicoAula);
    let _indice = this._analytics.topicos.findIndex(p => p.idTopicoAula == idTopicoAula );
    if (_indice => 0) {
      this._analytics.topicos.forEach(t => t.atual = false);
      this._analytics.topicos[_indice].atual = true;

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
    let aulascheckada = this._analytics.topicos.filter(p => p.checked == true).length;
    return  (aulascheckada/this._analytics.topicos.length)*100;
  }
}
