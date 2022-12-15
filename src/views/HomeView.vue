<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import type { Todo } from "@/types";
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/stores/todo";
const store = useTodoStore();
const { todos, getTodos } = storeToRefs(store);

//REFS

//FUNCTIONS
const addTodo = (data: Todo) => store.addTodo(data);
const toggleTodoToDone = (data: String) => store.toggleTodoToDone(data);
const clearCompleted = () => {
  store.clearCompleted();
};
const deleteTodo = (data: Todo) => {
  todos.value = todos.value.filter((el) => el.id !== data.id);
};
const editTodo = (data: Todo) => {
  todos.value = todos.value.map((todo) => (todo.id === data.id ? data : todo));
};
</script>

<template>
  <main class="main">
    <TodoList
      :todos="getTodos"
      @add-todo="addTodo"
      @set-todo-to-done="toggleTodoToDone"
      @clear-completed="clearCompleted"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
  </main>
</template>

<style scoped>
.main {
  height: 85vh;
  margin: 20px auto;
  width: 50%;
  border-radius: 10px;
  place-items: center;
}
</style>
