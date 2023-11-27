import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
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
export class HomeComponent implements OnInit{

  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }

    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }

    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3)
    ]
  });
  
  injector = inject(Injector);

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');

    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }

    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);

      localStorage.setItem('tasks', JSON.stringify(tasks));
      
    }, { injector: this.injector })
  }

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

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
