<script setup lang="ts">
import type { Todo } from "@/types";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
const emit = defineEmits(["delete-todo", "add-todo", "edit-todo"]);

let inputValue = ref<String>("");
let editedValue = ref<String>("");
let isInputEditing = ref<Boolean>(false);
const editInput = ref<HTMLInputElement>();

const deleteTodo = (todo: Todo) => {
  emit("delete-todo", todo);
};
const addTodo = () => {
  emit("add-todo", {
    id: uuidv4(),
    title: inputValue.value,
  });
  inputValue.value = "";
};
const editTodo = (todo: Todo) => {
  emit("edit-todo", {
    ...todo,
    title: editedValue.value,
  });
  editedValue.value = "";
  isInputEditing.value = !isInputEditing.value
};
const setTodoToDone = (todo: Todo) => {
  todo.isDone = !todo.isDone;
};
const setIsInputEditing = () => {
  isInputEditing.value = !isInputEditing.value;
};
const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});
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
          @click="setTodoToDone(todo)"
        ></div>
        <span class="content" :class="{ done: todo.isDone }">{{
          todo.title
        }}</span>
        <input
          ref="editInput"
          v-model="editedValue"
          class="edit-input"
          type="text"
          @keypress.enter="editTodo(todo)"
        />
        <button class="btn" @click="deleteTodo(todo)">x</button>
      </li>
    </ul>
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
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  font-size: 24px;
  line-height: 1.4em;
}

.input:focus {
  border: 2px solid red;
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
  list-style-type: none;
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

.green {
  background-color: darkseagreen;
}

.content {
  word-break: break-all;
  width: 90%;
}
</style>
