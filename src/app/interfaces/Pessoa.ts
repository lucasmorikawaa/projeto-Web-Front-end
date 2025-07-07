import { Category } from "./category";

export interface Pessoa {
    id ?: number;
    name ?: string;
    email ?: string;
    telefone ?: string;
    datanascimento ?: string;
    cpf ?: number;
    endereco ?: string;
    cidade ?: string;
    estado ?: Category;
    cep ?: string;
    favorito?: boolean;
}