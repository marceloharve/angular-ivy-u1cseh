import { Desafio } from "./desafio";

export interface TopicoAula {
  nome: string;
  video: string;
  revisao: string;
  desafio: Desafio;
  checked? : boolean;
  atual?: boolean;
  idTopicoAula : number;
  CP : string;
  MensagemBoasVindas : string;
}