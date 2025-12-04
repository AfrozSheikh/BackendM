# 📌 Phase 2 — Core Backend with Express (Backend Mastery)

This phase focuses on building a strong foundation in backend development using **Express.js**. By the end of this phase, you should be able to design well-structured backend applications, implement essential features, and understand how real-world APIs operate.

---

## 🚀 Objectives of This Phase

* Understand the **request-response lifecycle** in Express
* Learn and apply the concept of **middlewares** (normal + error-handling)
* Build modular application architecture: **Routes → Controllers → Models → Middlewares**
* Use **environment variables** for secure configuration
* Implement **input validation** using schema-based validation (Joi)
* Handle **file uploads** with Multer
* Implement **pagination, filtering, and sorting** for scalable APIs
* Build a complete Notes/Todo API with clean structure and best practices

---

## 🧠 Core Concepts Explained

### 1️⃣ Request–Response Lifecycle

Every HTTP request passes through a pipeline inside Express:

```
Client → Middleware stack → Router → Controller → Response
                   ↓
               Error Handler (if error occurs)
```

Each stage may modify or validate the request before it reaches the controller.

📌 Key takeaway: Express internally works like a **chain of functions** where each layer decides whether to continue (`next()`) or return a response.

---

### 2️⃣ Express Application Structure (Best Practice)

A maintainable Express application follows layered architecture:

```
app.js → handles middlewares & route registration
routes/ → maps URL to controller functions
controllers/ → core business logic
models/ → data storage/db logic
middlewares/ → validation/logger/errors/etc.
config/ → environment configurations
utils/ → helper reusable logic
```

Separation increases scalability, testability, and readability.

---

### 3️⃣ Middlewares

Middlewares are functions with access to:

```
(req, res, next)
```

Used for:

* Logging (e.g., morgan)
* Parsing JSON bodies (`express.json()`)
* Authentication & Authorization
* Input validation
* Error handling

👉 Special type: **Error-handler middleware**, signature:

```
(err, req, res, next)
```

This catches errors in one centralized place.

---

### 4️⃣ Error Handling (Global)

Rather than managing errors at route level using repeated `try/catch`, a single global error handler manages all of them.

Benefits:

* Cleaner code
* Consistent error response format
* Easier debugging

Example output:

```
{
  "success": false,
  "message": "Todo not found",
  "stack": "(only visible in development mode)"
}
```

---

### 5️⃣ Environment Variables (`dotenv`)

Never hard-code sensitive configuration in code.
Store settings in `.env` and load using `dotenv`.

Examples:
✔ PORT
✔ Database credentials
✔ API keys

This ensures:

* Code remains flexible across environments (dev/staging/prod)
* Sensitive data isn't stored inside version control

---

### 6️⃣ Input Validation (Joi)

Every request MUST be validated — never trust client input.

Validation ensures:

* Data integrity
* API reliability
* Security (prevents injection attacks)

Schemas define rules such as:

```
title: string, min(3), required
userId: number, required
```

---

### 7️⃣ Pagination, Filtering & Sorting

Used to optimize large datasets.

Features:

| Feature    | Benefit                                            |
| ---------- | -------------------------------------------------- |
| Pagination | Avoids sending all data, improves performance      |
| Filtering  | Allows refined dataset (e.g., by user or category) |
| Sorting    | Provides predictable ordering (ASC/DESC)           |

Pagination formula:

```
skip = (page - 1) × limit
```

---

### 8️⃣ File Upload Handling (Multer)

HTTP normally sends files using **multipart/form-data**.
Multer middleware helps parse and store uploaded files.

Use-cases:

* Profile pictures
* Document uploads
* Media storage

Files can be stored:

* Locally (beginner level)
* Cloud (advanced — AWS S3, Cloudinary, etc.)

---

## 🏗 Project for This Phase

### ✔ Notes/Todo CRUD API with:

* Create, Read, Update, Delete operations
* Input validation
* Error handling
* Pagination + search + sorting
* File upload route (optional bonus)
* Uses proper folder structure and middleware patterns

---

## 🎯 What You Should Be Able to Do After This Phase

| Skill                                    | Should You Know It?        |
| ---------------------------------------- | -------------------------- |
| Create REST API endpoints                | ✅                          |
| Apply middlewares & validation           | ✅                          |
| Manage global error handling             | ✅                          |
| Use environment configs properly         | ✅                          |
| Implement pagination, sorting, filtering | ✅                          |
| Handle file uploads                      | ⚡ Optional but recommended |

---

## 📦 Next Phase Preview

Phase 3 will introduce **real databases**:

* SQL fundamentals
* NoSQL fundamentals
* ORMs / Query Builders
* Database design patterns

This will convert your temporary in-memory storage into a real persistent backend.

---

### 🔥 Final Line

> After completing Phase 2, you're no longer building basic CRUD — you're building **structured, scalable, production-style backend APIs.**

---

If you complete this phase, you’re ready to integrate a **real database** and move toward building **full production-level systems.**
