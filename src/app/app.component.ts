import { Component, OnInit } from '@angular/core';
import { Itodo } from './itodo';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const data = localStorage.getItem("todos");
    if (data !== '' && data !== null) {
      this.todos = JSON.parse(data);
      this.logging("List loaded: " + data);
    }
  }

  constructor(private loggingService: LoggingService) { }

  title = 'toDoApp';

  todos: Itodo[] = [];

  newTodo = '';

  logging(msg: any) {
    this.loggingService.logging(msg);
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({todo: this.newTodo, done: false});
    }
    this.logging("Added: \"" + this.newTodo + "\"");
    this.newTodo = '';
    this.storeTodos();
  }

  toggleTodo(index:number) {
    this.todos[index].done = !this.todos[index].done;
    this.logging("Toggled: \"" + this.todos[index].todo + "\" and now has done = " + this.todos[index].done);
    this.storeTodos();
  }

  deleteTodo(index:number) {
    this.logging("Deleted: \"" + this.todos[index].todo + "\"");
    this.todos.splice(index, 1);
    this.storeTodos();
  }

  countOpenTodos() {
    const done = this.todos.filter((item) => {
      return !item.done;
    });
    return done;
  }

  storeTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
