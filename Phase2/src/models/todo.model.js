let todos = []; // temporary in-memory store
let currentId = 1;

export function createTodo({ userId, title, description }) {
  const newTodo = {
    id: currentId++,
    userId,
    title,
    description: description || "",
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  todos.push(newTodo);
  return newTodo;
}

export function getTodos({ userId, search, sortBy, sortOrder, page, limit }) {
  let filtered = [...todos];

  if (userId) {
    filtered = filtered.filter((todo) => todo.userId === Number(userId));
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter((todo) =>
      todo.title.toLowerCase().includes(s) ||
      todo.description.toLowerCase().includes(s)
    );
  }

  // Sorting
  if (sortBy === "createdAt" || sortBy === "title") {
    filtered.sort((a, b) => {
      if (sortOrder === "desc") {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return { data, total };
}

export function getTodoById(id) {
  return todos.find((todo) => todo.id === Number(id));
}

export function updateTodo(id, payload) {
  const index = todos.findIndex((todo) => todo.id === Number(id));
  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    ...payload,
    updatedAt: new Date()
  };

  return todos[index];
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === Number(id));
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
