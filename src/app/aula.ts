import { TopicoAula } from "./topicoaula";

export interface Aula {
  nome : string;
  aula: number;
  topicos : TopicoAula[];
  checked? : boolean;
  atual?: boolean;
}