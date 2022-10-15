import { idGenerator } from "./utils";

class Task {
  constructor(name) {
    this.id = idGenerator();
    this.name = name;
    this.created = new Date();
    this.updated = new Date();
  }

  /*Métodos*/
  getID() {
    return this.id;
  }

  getDateCreated() {
    return this.created;
  }
  getDateUpdate() {
    return this.updated;
  }
}

export { Task };
