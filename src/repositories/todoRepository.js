const fp = require("fastify-plugin");

class TodoRepository {
  constructor(db) {
    this.db = db;
  }

  async create(todoText) {
    this.db.todos.push({ text: todoText, id: this.db.todos.length });

    return this.db.todos;
  }

  async getAll() {
    return this.db.todos;
  }

  async getOne(id) {
    return this.db.todos.find((todo) => todo.id == id);
  }

  async deleteAll() {}

  async deleteOne(id) {}
}

async function todoRepository(fastify, options) {
  const { db } = fastify;
  const repo = new TodoRepository(db);
  fastify.decorate("todoRepository", repo);
}

module.exports = fp(todoRepository);
