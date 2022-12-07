<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import type { Todo } from "@/types";
import { ref } from "vue";

let todos = ref<Todo[]>([]);

const addTodo = (data: Todo) => todos.value.push(data);

const deleteTodo = (data: Todo) => {
  todos.value = todos.value.filter((el) => el.id !== data.id);
};

const editTodo = (data: Todo) => {
  todos.value = todos.value.map((todo) => (todo.id === data.id ? data : todo));
};
</script>

<template>
  <main class="main">
    <TodoList :todos="todos" @add-todo="addTodo" @delete-todo="deleteTodo" @edit-todo="editTodo" />
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
