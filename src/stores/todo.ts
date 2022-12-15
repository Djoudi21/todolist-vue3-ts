import { defineStore } from "pinia";
import type { StateShape, Todo } from "@/types";

export const useTodoStore = defineStore("TodoStore", {
  state: (): StateShape => ({
    todos: [],
    completedTodos: [],
    activeTodos: [],
  }),
  getters: {
    numberOfDoneRestaurants: (state): number => {
      return 3;
      // return state.filteredTodos.length;
    },
    getActiveTodos: (state: StateShape): Todo[] => {
      state.activeTodos = state.todos.filter((todo) => !todo.isDone);
      return state.activeTodos;
    },
    getCompletedTodos: (state: StateShape): Todo[] => {
      state.completedTodos = state.todos.filter((todo) => todo.isDone);
      return state.completedTodos;
    },
    getAllTodos: (state: StateShape): Todo[] => {
      return state.todos;
    },
  },
  actions: {
    addTodo(payload: Todo) {
      this.todos.push(payload);
    },
    setTodoToDone(payload: String) {
      const todoToSetToDone: any = this.todos.find(
        (todo) => todo.id === payload
      );
      if (todoToSetToDone !== undefined) todoToSetToDone.isDone = true;
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.isDone);
    },
  },
});
