export interface Tarefa{
    id?: number,
    name: string;
    description: string;
    active: boolean;
    isCompleted: boolean;
    categoryId: number;
    category?: string;
    createdAt?: string;
    progress: number;
}