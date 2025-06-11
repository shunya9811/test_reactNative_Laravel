import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Todo {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateTodoInput {
    title: string;
    description?: string;
    completed?: boolean;
}

export const todoApi = {
    getAll: async (): Promise<Todo[]> => {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    },

    create: async (todo: CreateTodoInput): Promise<Todo> => {
        const response = await axios.post(`${API_URL}/todos`, todo);
        return response.data;
    },

    update: async (id: number, todo: Partial<CreateTodoInput>): Promise<Todo> => {
        const response = await axios.put(`${API_URL}/todos/${id}`, todo);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/todos/${id}`);
    }
};

export default todoApi; 