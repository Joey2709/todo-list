import {
  create_task_local_storage,
  delete_task_local_storage,
  delete_all_task_local_storage,
  get_all_task_local_storage,
  update_task_local_storage,
} from "./localStorage";
import { Task } from "./class";
import { resultFromDates } from "./utils";
import { format, compareDesc, parseISO, toDate } from "date-fns";

const submitButton = document.getElementById("submit");
const nameInput = document.getElementById("name");
const tasks = document.getElementById("task");
const deleteAllButton = document.getElementById("delete-all");
const alltaskButton = document.getElementById("all-tasks");
const filterUpdatedButton = document.getElementById("filter-update");
const filterCreatedButton = document.getElementById("filter-create");

var editButtonModal = document.getElementById("edit");
var nameUpdateModal = document.getElementById("name-update");

let data = get_all_task_local_storage();
renderAllTasks();

submitButton.addEventListener("click", createTask);
deleteAllButton.addEventListener("click", function () {
  delete_all_task_local_storage(data);
  tasks.innerHTML = "";
});
alltaskButton.addEventListener("click", function () {
  tasks.innerHTML = "";
  renderAllTasks();
});
filterUpdatedButton.addEventListener("click", taskFilterUpdated);
filterCreatedButton.addEventListener("click", taskfilterCreated);

function createTask() {
  if (nameInput.value.length == 0) {
    return;
  }

  const newTask = new Task(nameInput.value);
  create_task_local_storage(newTask, data);

  const taskContainer = document.createElement("div");
  const textTaskContainer = document.createElement("div");
  const buttonTaskContainer = document.createElement("div");

  const nameTaskText = document.createElement("p");
  const createTaskText = document.createElement("p");
  const deleteTaskButton = document.createElement("button");
  const updateTaskButton = document.createElement("button");

  tasks.appendChild(taskContainer).classList.add("task-item");
  taskContainer.appendChild(textTaskContainer);
  taskContainer.appendChild(buttonTaskContainer);

  textTaskContainer.appendChild(nameTaskText);
  textTaskContainer.appendChild(createTaskText);
  buttonTaskContainer.appendChild(deleteTaskButton);
  buttonTaskContainer.appendChild(updateTaskButton);

  let id = newTask.getID();
  let dateCreated = newTask.getDateCreated();
  let auxvar = "Created";
  nameTaskText.textContent = nameInput.value;
  createTaskText.innerHTML = `<span class="status-created">Created</span> ${format(
    dateCreated,
    "LLL dd, yyyy, hh:mm bbbb"
  )}`;

  deleteTaskButton.textContent = "Delete Task";

  deleteTaskButton.onclick = function () {
    delete_task_local_storage(id, data);
    tasks.removeChild(taskContainer);
  };

  updateTaskButton.textContent = "Update Task";
  updateTaskButton.onclick = function () {
    onModal();
    let getValues = data.find((a) => a.id == id);
    nameUpdateModal.value = getValues.name;

    editButtonModal.onclick = function () {
      update_task_local_storage(id, nameUpdateModal.value, data);
      nameTaskText.textContent = nameUpdateModal.value;
      createTaskText.innerHTML = `<span class="status-updated">Updated</span> ${format(
        new Date(),
        "LLL dd, yyyy, hh:mm bbbb"
      )}`;
      offModal();
    };
  };

  nameInput.value = "";
}

function renderAllTasks() {
  renderTaks(get_all_task_local_storage());
}

function taskfilterCreated() {
  let dataFiltered = get_all_task_local_storage().filter(
    (e) => e.created == e.updated
  );
  tasks.innerHTML = "";
  renderTaks(dataFiltered);
}

function taskFilterUpdated() {
  let dataFiltered = get_all_task_local_storage().filter(
    (e) =>
      compareDesc(toDate(parseISO(e.created)), toDate(parseISO(e.updated))) == 1
  );
  tasks.innerHTML = "";
  renderTaks(dataFiltered);
}

function renderTaks(alldata) {
  alldata.forEach((e) => {
    const taskContainer = document.createElement("div");
    const textTaskContainer = document.createElement("div");
    const buttonTaskContainer = document.createElement("div");

    const nameTaskText = document.createElement("p");
    const createTaskText = document.createElement("p");
    const deleteTaskButton = document.createElement("button");
    const updateTaskButton = document.createElement("button");

    tasks.appendChild(taskContainer).classList.add("task-item");
    taskContainer.appendChild(textTaskContainer);
    taskContainer.appendChild(buttonTaskContainer);

    textTaskContainer.appendChild(nameTaskText);
    textTaskContainer.appendChild(createTaskText);
    buttonTaskContainer.appendChild(deleteTaskButton);
    buttonTaskContainer.appendChild(updateTaskButton);

    nameTaskText.textContent = e.name;

    let id = e.id;
    let dateCreated = e.created;
    let dateUpdated = e.updated;

    createTaskText.innerHTML = resultFromDates(dateCreated, dateUpdated);

    deleteTaskButton.textContent = "Delete Task";
    deleteTaskButton.onclick = function () {
      delete_task_local_storage(id, data);
      tasks.removeChild(taskContainer);
    };

    updateTaskButton.textContent = "Update Task";
    updateTaskButton.onclick = function () {
      onModal();
      let getValues = data.find((a) => a.id == id);
      nameUpdateModal.value = getValues.name;
      editButtonModal.onclick = function () {
        nameTaskText.textContent = nameUpdateModal.value;
        createTaskText.innerHTML = `<span class="status-updated">Updated</span> ${format(
          new Date(),
          "LLL dd, yyyy, hh:mm bbbb"
        )}`;
        update_task_local_storage(id, nameUpdateModal.value, data);
        offModal();
      };
    };
  });
}

/* Modal */

const modalContainer = document.getElementsByClassName("modal-container")[0];
const modalOpen = document.getElementsByClassName("modal")[0];

function onModal() {
  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";
  modalOpen.style.transform = "translate(0,0)";
}

function offModal() {
  modalOpen.style.transform = "translate(0,-500%)";
  setTimeout(function () {
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  }, 700);
}

window.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    createTask();
  }
});

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    offModal();
  }
});
