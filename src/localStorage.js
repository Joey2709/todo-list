const create_task_local_storage = (newTask, data) => {
  data.push(newTask);
  localStorage.setItem("task", JSON.stringify(data));
};

const delete_task_local_storage = (id, data) => {
  let index = data.findIndex((a) => a.id == id);
  data.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(data));
};

const delete_all_task_local_storage = (data) => {
  data.splice(0, data.length);
  localStorage.setItem("task", JSON.stringify(data));
};

const get_all_task_local_storage = () => {
  let allData = JSON.parse(localStorage.getItem("task"));
  return allData;
};

const update_task_local_storage = (id, update, data) => {
  let taskUpdated = data.find((a) => a.id == id);
  taskUpdated.name = update;
  taskUpdated.updated = new Date();
  data.splice(data.indexOf(taskUpdated), 1, taskUpdated);
  localStorage.setItem("task", JSON.stringify(data));
};

export {
  create_task_local_storage,
  delete_task_local_storage,
  delete_all_task_local_storage,
  get_all_task_local_storage,
  update_task_local_storage,
};
