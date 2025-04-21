# 🧑‍💼 Employee Tracker CLI - PostgreSQL + Node.js

This command-line application allows business owners to manage a company's employee database. Users can view and interact with departments, roles, and employees using a simple menu system. The app uses **Node.js**, **Inquirer**, and **PostgreSQL**.

## 📹 Walkthrough Video

👉 [Watch the demo here](YOUR_VIDEO_LINK_HERE)

> Replace `YOUR_VIDEO_LINK_HERE` with the actual link to your walkthrough video.

---

## 🛠 Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee’s role
- Bonus: View by manager/department, update managers, delete records, and more!

---

## 🚀 How to Run

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure PostgreSQL is running and set up your database with the provided schema.
4. Start the application:
   ```bash
   node index.js
   ```

---

## 🗃 Database Schema

The application uses the following PostgreSQL tables:

- `department`
  - `id`: `SERIAL PRIMARY KEY`
  - `name`: `VARCHAR(30) UNIQUE NOT NULL`

- `role`
  - `id`: `SERIAL PRIMARY KEY`
  - `title`: `VARCHAR(30) UNIQUE NOT NULL`
  - `salary`: `DECIMAL NOT NULL`
  - `department_id`: `INTEGER NOT NULL` (FK)

- `employee`
  - `id`: `SERIAL PRIMARY KEY`
  - `first_name`: `VARCHAR(30) NOT NULL`
  - `last_name`: `VARCHAR(30) NOT NULL`
  - `role_id`: `INTEGER NOT NULL` (FK)
  - `manager_id`: `INTEGER` (FK, nullable)

---

## 📁 File Structure

```
├── db/
│   ├── schema.sql
│   ├── seeds.sql
│   └── queries.js
├── index.js
├── package.json
├── README.md
```

---

## 📦 Technologies Used

- Node.js
- Inquirer (v8.2.4)
- PostgreSQL
- pg package

---

## ✍️ Author

Built by a developer as part of a full-stack bootcamp challenge to practice backend and database management.

---

## ✅ License

This project is licensed under the MIT License.

---
