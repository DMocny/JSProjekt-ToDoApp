const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todoList = [];

app.get("/", (req, res) => {
  res.send("Serwer działa!");
});

app.post("/todos", (req, res) => {
  todoList.push(req.body);
  res.status(200).end();
});

app.get("/todos", (req, res) => {
  res.json({ todoList });
});

app.delete("/todos/:todoId", (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);

  const todoItemIndex = todoList.findIndex((e) => e.id === todoId);

  if (todoItemIndex !== undefined) {
    todoList.splice(todoItemIndex, 1);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.patch("/todos/:todoId", (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);
  const todoItem = todoList.find((e) => e.id === todoId);

  if (todoItem) {
    const update = req.body;

    if (update.completed !== undefined) {
      todoItem.completed = update.completed;
    }

    if (update.title !== undefined) {
      todoItem.title = update.title;
    }

    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Aplikacja wystrtowała na porcie ${port}`);
});
/*const express = require("express");
const cors = require("cors");
const app = express();

let todoList = []; // Lista zadań

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    res.send("Serwer działa");
});

app.post('/todos', (req, res) => {
    todoList.push(req.body);
    res.status(200).end();
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todoList = todoList.filter(todo => todo.id !== id);
    res.status(200).end();
});

app.listen(8888, () => {
    console.log("Serwer uruchomiony: port 8888");
});*/
