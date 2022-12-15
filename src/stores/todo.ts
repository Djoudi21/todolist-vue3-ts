import { defineStore } from "pinia";
import type { StateShape, Todo } from "@/types";

export const useTodoStore = defineStore("TodoStore", {
  state: (): StateShape => ({
    todos: [],
    completedTodos: [],
    activeTodos: [],
    filter: "",
  }),
  getters: {
    getTodos: (state: StateShape): Todo[] => {
      if (state.filter === "active") {
        state.activeTodos = state.todos.filter((todo) => !todo.isDone);
        return state.activeTodos;
      } else if (state.filter === "completed") {
        state.completedTodos = state.todos.filter((todo) => todo.isDone);
        return state.completedTodos;
      } else {
        return state.todos;
      }
    },
    getLeftItems: (state: StateShape): Number => {
      return state.todos.filter((todo) => !todo.isDone).length;
    },
  },
  actions: {
    addTodo(payload: Todo) {
      this.todos.push(payload);
    },
    toggleTodoToDone(payload: String) {
      const todoToSetToDone: any = this.todos.find(
        (todo) => todo.id === payload
      );
      if (todoToSetToDone !== undefined)
        todoToSetToDone.isDone = !todoToSetToDone.isDone;
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.isDone);
    },
    setFilter(filter: String) {
      this.filter = filter;
    },
  },
});
