export interface Desafio {
  pergunta: string;
  respostas: string[];
  respostacerta: number;
  setup: string;
  checked? : boolean;
  atual?: boolean;
}
