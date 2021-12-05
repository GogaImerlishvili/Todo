"use strict";

// Selectos
let burgerButton = document.querySelector(".hamburger");
let navList = document.querySelector(".nav-ul");
let inputValue = document.querySelector(".input-value");
let addButton = document.querySelector(".add-button");
let todoList = document.querySelector(".todo-list");
let todoLi = document.querySelector(".add-li");
let filterOption = document.querySelector(".filter-todo");

// EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
burgerButton.addEventListener("click", addMenu);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckInput);
filterOption.addEventListener("click", filterTodo);
inputValue.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    return addTodo();
  }
});

// Functions

function addMenu() {
  navList.classList.toggle("nav-active");
  burgerButton.classList.toggle("active");
}

function addTodo(event) {
  event.preventDefault();
  if (inputValue.value !== "") {
    const html = `<div class = "todo">
    <li class = "todo-item">${inputValue.value}</li> 
    <button class = "check-button"><i class = "fas fa-check-circle"></i></button>
    <button class = "edit-button"><i class = "fas fa-edit"></i></button>
    <button class = "trash-button"><i class = "fas fa-trash-alt"></i></button>
    </div>`;
    todoList.insertAdjacentHTML("beforeend", html);
    saveLocalTodos(inputValue.value);
    inputValue.value = "";
  }
}

function deleteCheckInput(e) {
  const item = e.target;
  console.log(item);
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "check-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] === "edit-button") {
    let editValue = prompt("edit the selected item", item.childNodes[0].value);
    item.childNodes[0].nodeValue = editValue;
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const html = `<div class = "todo">
    <li class = "todo-item" readonly>${todo}</li>
    <button class = "check-button"><i class = "fas fa-check-circle"></i></button>
    <button class = "edit-button"><i class = "fas fa-edit"></i></button>
    <button class = "trash-button"><i class = "fas fa-trash-alt"></i></button>
    </div>`;
    todoList.insertAdjacentHTML("beforeend", html);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
