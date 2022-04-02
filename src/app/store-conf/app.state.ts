import { Todo } from "../shared/models/todo";

export interface AppState {
    todos: Todo[];
}

export const initialState: AppState = {
    todos: []
};