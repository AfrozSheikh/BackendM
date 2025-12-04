import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
  } from "../models/todo.model.js";
  
  export function createTodoHandler(req, res, next) {
    try {
      const { userId, title, description } = req.body;
      const todo = createTodo({ userId, title, description });
  
      res.status(201).json({
        success: true,
        message: "Todo created successfully",
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }
  
  export function getTodosHandler(req, res, next) {
    try {
      const { userId, page, limit, search, sortBy, sortOrder } = req.query;
  
      const { data, total } = getTodos({
        userId,
        search,
        sortBy,
        sortOrder,
        page: Number(page),
        limit: Number(limit)
      });
  
      res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  export function getTodoByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      const todo = getTodoById(id);
  
      if (!todo) {
        const err = new Error("Todo not found");
        err.statusCode = 404;
        throw err;
      }
  
      res.status(200).json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }
  
  export function updateTodoHandler(req, res, next) {
    try {
      const { id } = req.params;
      const updated = updateTodo(id, req.body);
  
      if (!updated) {
        const err = new Error("Todo not found");
        err.statusCode = 404;
        throw err;
      }
  
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }
  
  export function deleteTodoHandler(req, res, next) {
    try {
      const { id } = req.params;
      const ok = deleteTodo(id);
  
      if (!ok) {
        const err = new Error("Todo not found");
        err.statusCode = 404;
        throw err;
      }
  
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
  