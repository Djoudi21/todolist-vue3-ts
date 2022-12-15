<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import type { Todo } from "@/types";
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/stores/todo";
import { computed, ref } from "vue";
const store = useTodoStore();
const { todos } = storeToRefs(store);

//REFS
let filterValue = ref<String>("");

//FUNCTIONS
const addTodo = (data: Todo) => store.addTodo(data);
const setTodoToDone = (data: String) => store.setTodoToDone(data);
const clearCompleted = () => {
  store.clearCompleted();
};
const deleteTodo = (data: Todo) => {
  todos.value = todos.value.filter((el) => el.id !== data.id);
};
const editTodo = (data: Todo) => {
  todos.value = todos.value.map((todo) => (todo.id === data.id ? data : todo));
};
const titi = (value: String) => {
    filterValue.value = value;
};

//COMPUTED
// eslint-disable-next-line vue/return-in-computed-property
const truc2 = computed(() => {
  if (filterValue.value === "active") {
    return store.getActiveTodos;
  } else if (filterValue.value === "completed") {
    return store.getCompletedTodos;
  } else {
    return store.getAllTodos;
  }
});
</script>

<template>
  <main class="main">
    <TodoList
      :todos="truc2"
      @add-todo="addTodo"
      @set-todo-to-done="setTodoToDone"
      @clear-completed="clearCompleted"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
      @filter-todos="titi"
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
