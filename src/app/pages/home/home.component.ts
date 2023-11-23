import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([{
    id: Date.now(),
    title: "Titulo",
    completed: false
  },
  {
    id: Date.now(),
    title: "Titulo 2",
    completed: false
  }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3)
    ]
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value;

      this.tasks.update((previous) => [
        ...previous,
        { id: Date.now(), title: value.trim(), completed: false },
      ]);

      // this.newTaskCtrl.setValue('');
      // this.addTask(newTask);
    }
  }

  addTask(title: string){
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  changeState(task:Task){
    task.completed = !task.completed
    console.log(`EL ESTADO ES: ${task.completed}`);
  }

  updateTaskEditing(index: number){
    if(this.tasks()[index].completed) return;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            editing: true
          };
        }

        return {
          ...task,
          editing: false
        };
      })
    })

  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;

    if(this.tasks()[index].completed) return;

    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          };
        }

        return task;
      })
    })

  }
}
