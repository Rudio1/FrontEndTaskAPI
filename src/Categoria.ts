import { Tarefa } from './Tarefa';

export interface Categoria {
    id? : number,
    name : string,
    chores?: Tarefa[]
}