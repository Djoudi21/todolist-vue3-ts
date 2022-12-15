//Type definition
export type Todo = {
  id: String;
  title: String;
  isDone: Boolean;
};

export type StateShape = {
  completedTodos: Todo[];
  todos: Todo[];
  activeTodos: Todo[];
  filter: String;
};
