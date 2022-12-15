<script setup lang="ts">
//DEPENDENCIES
import { computed } from "vue";

//DEFINE FUNCTIONS
const emit = defineEmits(["clear-completed", "filter-todos"]);

//STORE
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
const store = useTodoStore();
const { todos, getLeftItems } = storeToRefs(store);

//FUNCTIONS
const clearCompleted = () => {
  emit("clear-completed");
};

//COMPUTED
const leftItems = computed((): String => {
  if (getLeftItems.value > 1) {
    return `${getLeftItems.value} items left`;
  } else {
    return `${getLeftItems.value} item left`;
  }
});
const showClearCompletedBtn = computed((): Object => {
  return todos.value.filter((todo) => todo.isDone).length > 0
    ? { visibility: "visible" }
    : { visibility: "hidden" };
});
</script>

<template>
  <footer class="footer-container">
    <div>{{ leftItems }}</div>
    <ul class="list-container">
      <li class="filter">
        <a @click="store.setFilter('all')" href="#">All</a>
      </li>
      <li class="filter">
        <a @click="store.setFilter('active')" href="#">Active</a>
      </li>
      <li class="filter">
        <a @click="store.setFilter('completed')" href="#">Completed</a>
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
