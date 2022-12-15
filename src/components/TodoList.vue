<script setup lang="ts">
//DEPENDENCIES
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

//TYPES IMPORTS
import type { Todo } from "@/types";

//COMPONENTS IMPORTS
import TodoListFooter from "@/components/TodoListFooter.vue";

//DEFINE FUNCTIONS
const emit = defineEmits<{
  (e: "filter-todos", value: String): void;
  (e: "clear-completed"): void;
  (e: "set-todo-to-done", value: String): void;
  (e: "add-todo", value: Todo): void;
  (e: "delete-todo", value: Todo): void;
  (e: "edit-todo", value: Todo): void;
}>();

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

//REFS
let inputValue = ref<String>("");
let editedValue = ref<String>("");
let isInputEditing = ref<Boolean>(false);
const editInput = ref<HTMLInputElement>();

//FUNCTIONS
const clearCompleted = () => {
  emit("clear-completed");
};
const deleteTodo = (todo: Todo) => {
  emit("delete-todo", todo);
};
const addTodo = () => {
  emit("add-todo", {
    id: uuidv4(),
    title: inputValue.value.trim(),
    isDone: false,
  });
  inputValue.value = "";
};
const editTodo = (todo: Todo) => {
  emit("edit-todo", {
    ...todo,
    title: editedValue.value,
  });
  editedValue.value = "";
  isInputEditing.value = !isInputEditing.value;
};
const toggleTodoToDone = (todo: Todo) => {
  emit("set-todo-to-done", todo.id);
};
const setIsInputEditing = () => {
  isInputEditing.value = !isInputEditing.value;
};
const displayEditingInput = () => {
  isInputEditing.value = !isInputEditing.value;
};
</script>

<template>
  <section class="container">
    <form @submit.prevent class="form">
      <input
        placeholder="What need to be done?"
        @keypress.enter="addTodo"
        autofocus
        class="input"
        :class="{ hide: isInputEditing.value }"
        type="text"
        v-model="inputValue"
      />
    </form>
    <ul>
      <li
        class="list-item"
        v-for="todo in props.todos"
        :key="todo.id"
        @click="setIsInputEditing"
      >
        <div
          :class="{ green: todo.isDone }"
          class="done-icon"
          @click="toggleTodoToDone(todo)"
        ></div>
        <span
          @dbclick="displayEditingInput"
          class="content"
          :class="{ done: todo.isDone }"
          >{{ todo.title }}</span
        >
        <input
          ref="editInput"
          v-model="editedValue"
          :class="{ show: isInputEditing.value, hide: !isInputEditing.value }"
          class="edit-input"
          type="text"
          @keypress.enter="editTodo(todo)"
        />
        <button class="btn" @click="deleteTodo(todo)">x</button>
      </li>
    </ul>
    <TodoListFooter
      @clear-completed="clearCompleted"
    />
  </section>
</template>

<style scoped>
.container {
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 24px;
  line-height: 1.4em;
}

.input:focus {
  outline: none;
}

.edit-input:focus {
  outline: none;
}

.input::placeholder {
  opacity: 0.3;
}

.edit-input {
  position: absolute;
  background: rgba(0, 0, 0, 0.003);
  z-index: 1;
  font-size: 24px;
  line-height: 1.4em;
  margin-left: 50px;
  width: 90%;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.btn {
  position: absolute;
  color: #cc9a9a;
  background: rgba(0, 0, 0, 0.003);
  border: none;
  font-size: 30px;
  margin: auto 0;
  right: 10px;
  bottom: 0;
  top: 0;
  display: none;
}

.done-icon {
  height: 20px;
  width: 20px;
  border-radius: 50px;
  border: 2px solid #d9d9d9;
}

.list-item {
  position: relative;
  padding: 16px 50px 16px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item:hover .btn {
  display: block;
}

.btn:hover {
  color: red;
  cursor: pointer;
}

.done {
  color: #d9d9d9;
  text-decoration: line-through;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.green {
  background-color: darkseagreen;
}

.content {
  word-break: break-all;
  width: 90%;
}
</style>
