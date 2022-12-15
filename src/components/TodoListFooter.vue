<script setup lang="ts">
//DEPENDENCIES
import { computed } from "vue";

//DEFINE FUNCTIONS
const emit = defineEmits(["clear-completed", "filter-todos"]);

//STORE
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
const store = useTodoStore();
const { todos } = storeToRefs(store);

//FUNCTIONS
const clearCompleted = () => {
  emit("clear-completed");
};
const sendFilterTodosEmit = (data: String) => {
  emit("filter-todos", data.toLowerCase());
};

//COMPUTED
const numberOfItemsLeft = computed((): String => {
  if (todos.value.length - store.numberOfDoneRestaurants <= 1) {
    return `${todos.value.length - store.numberOfDoneRestaurants} item left`;
  } else {
    return `${todos.value.length - store.numberOfDoneRestaurants} items left`;
  }
});
const showClearCompletedBtn = computed((): Object => {
  return store.numberOfDoneRestaurants > 0
    ? { visibility: "visible" }
    : { visibility: "hidden" };
});
</script>

<template>
  <footer class="footer-container">
    <div>{{ numberOfItemsLeft }}</div>
    <ul class="list-container">
      <li class="filter">
        <a @click="sendFilterTodosEmit('all')" href="#">All</a>
      </li>
      <li class="filter">
        <a @click="sendFilterTodosEmit('active')" href="#">Active</a>
      </li>
      <li class="filter">
        <a @click="sendFilterTodosEmit('completed')" href="#">Completed</a>
      </li>
    </ul>
    <button class="btn" :style="showClearCompletedBtn" @click="clearCompleted">
      Clear completed
    </button>
  </footer>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.list-container {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.filter {
  margin: 0 10px;
}

.btn {
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  appearance: none;
}

.btn:hover {
  opacity: 0.5;
}
</style>
