import express from "express";
import Joi from "joi";

import {
  createTodoHandler,
  getTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler
} from "../controllers/todo.controller.js";

import { validate } from "../middlewares/validate.js";

const router = express.Router();

// ---- Joi Schemas ----

const createTodoSchema = Joi.object({
  body: Joi.object({
    userId: Joi.number().integer().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional()
  }),
  query: Joi.object(),
  params: Joi.object()
});

const getTodosSchema = Joi.object({
  body: Joi.object(),
  query: Joi.object({
    userId: Joi.number().integer().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    search: Joi.string().optional(),
    sortBy: Joi.string().valid("createdAt", "title").default("createdAt"),
    sortOrder: Joi.string().valid("asc", "desc").default("desc")
  }),
  params: Joi.object()
});

const todoIdParamSchema = Joi.object({
  body: Joi.object(),
  query: Joi.object(),
  params: Joi.object({
    id: Joi.number().integer().required()
  })
});

const updateTodoSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    isCompleted: Joi.boolean().optional()
  }).min(1),
  query: Joi.object(),
  params: Joi.object({
    id: Joi.number().integer().required()
  })
});

// ---- Routes ----

router.post("/", validate(createTodoSchema), createTodoHandler);

router.get("/", validate(getTodosSchema), getTodosHandler);

router.get("/:id", validate(todoIdParamSchema), getTodoByIdHandler);

router.patch("/:id", validate(updateTodoSchema), updateTodoHandler);

router.delete("/:id", validate(todoIdParamSchema), deleteTodoHandler);

export default router;
