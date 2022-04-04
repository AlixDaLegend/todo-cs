import { Todo } from "../shared/models/todo";
import { AppActionsType } from "./app.actions";
import { appTodosReducer } from "./app.reducers";
import { AppState, initialState } from "./app.state";

describe('AppTodosReducer', () => {

    const todoList: Todo[] = [{
        id: 0,
        title: "Contact Product Owner for roadmap",
        done: false
    },
    {
      id: 1,
      title: "Other",
      done: false
    }];


    describe('unknown action', () => {

        it('return the default state', () => {
            /*
            const { initialState } = appTodosReducer;
            const state = appTodosReducer.booksReducer(initialState, action);
            
            expect(state).toBe(initialState);
            */
            const action = {
                type: 'Unknown',
            };
            expect(appTodosReducer(initialState, action)).toEqual(initialState);
        });
    });

    describe('toggle action', () => {

        it("return the state with the todo's state changed", () => {
            // To done
            let appState: AppState = {
                todos: [todoList[1],todoList[0]]
            }
            let expectedState: AppState = {
                todos: [{...todoList[1], done:!todoList[1].done }, todoList[0]]
            }
            let toggledTodo: Todo = {...todoList[1], done:!todoList[1].done };
            let action = {
                type: AppActionsType.TODO_STATE_TOGGLE,
                payload: { toggledTodo }
            };
            expect(appTodosReducer(appState, action)).toEqual(expectedState);

            // to undone
            appState = {
                todos: [{...todoList[0], done:!todoList[0].done }]
            }
            expectedState = {
                todos: [todoList[0]]
            }
            toggledTodo= {...todoList[0], done:false };
            action = {
                type: AppActionsType.TODO_STATE_TOGGLE,
                payload: { toggledTodo }
            };
            expect(appTodosReducer(appState, action)).toEqual(expectedState);
            
        });

        
    });

    describe('load todos', () => {

        it('update the todo list', () => {
            let appState: AppState = {
                todos: []
            }
            let expectedState: AppState = {
                todos: todoList
            }
            // To done
            let action = {
                type: AppActionsType.LOAD_SUCCESS,
                payload: { todos: todoList }
            };
            expect(appTodosReducer(appState, action)).toEqual(expectedState);

            
        });
    });
});