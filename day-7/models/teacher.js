export default class Teacher {
  static idCounter = 1;
  constructor(name) {
    this.id = Teacher.idCounter++;
    this.name = name;
  }
}
