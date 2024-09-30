let tasks = [
  { id: 1, task: "Hacer Aseo", finished: false },
  { id: 2, task: "Hacer tareas", finished: true },
  { id: 3, task: "Ir al Gym", finished: false },
  { id: 4, task: "Lavar la ropa", finished: false },
];

// DOM Elements - References to HTML elements
const input = document.getElementById("taskInput"); // Input field for new tasks
const taskDiv = document.getElementById("taskList"); // Container for the task list
const taskTotalSpan = document.querySelector(".totalTasks .value"); // Total task count
const finishedSpan = document.querySelector(".completedTasks .value"); // Finished task count
const label = document.querySelector(".form-label");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", () => {
  initialTasks();
  countTasks();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim()) {
    const addNewTask = {
      id: tasks.length + 1,
      task: input.value.trim(),
      finished: false,
    };
    tasks.push(addNewTask);
    initialTasks();
    countTasks();
    label.innerHTML = "";
  } else {
    label.innerHTML = "Debes ingresar una tarea";
  }
  form.reset();
});

const initialTasks = () => {
  let template = "";
  for (const task of tasks) {
    template += createElements(task);
  }
  taskDiv.innerHTML = template;
};

function createElements(task) {
  return `
    <div class="task-row ${task.finished ? "completed" : ""}">
    <div class="title3">${task.id}</div> 
    <div class="title3">${task.task}</div>
    <div class="square">
      <input type="checkbox" class="check" title="Complete" ${
        task.finished ? "checked" : ""
      } onchange="taskCompletion(${task.id})">
      <i class="del fa-solid fa-circle-xmark" title="Delete" onclick="deleteTask(${
        task.id
      })"></i>
    </div>
    </div>
  `;
}

function taskCompletion(id) {
  const indexTask = tasks.findIndex((task) => task.id == id);
  tasks[indexTask].finished = !tasks[indexTask].finished; // Alterna entre true y false
  initialTasks(); // Renderiza nuevamente las tareas
  countTasks();
}

function deleteTask(id) {
  const indexTask = tasks.findIndex((task) => task.id == id);
  tasks.splice(indexTask, 1); // Elimina la tarea por su índice
  initialTasks();
  countTasks(); // Actualiza los contadores
}

function countTasks() {
  taskTotalSpan.innerHTML = `<strong>${tasks.length}</strong>`;
  const totalFinishedSpan = tasks.filter((task) => task.finished == true);
  finishedSpan.innerHTML = `<strong>${totalFinishedSpan.length}</strong>`;
}
