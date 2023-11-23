import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'universo';
  tasks = signal([
    "Learn English",
    "Read a book",
    "Help with homeworks",
    "Programming"
  ]);

  valueInput = ''

  nombre = "Lisa Simpsom"
  pais = "Jamaica"
  habilitado = true
  urlImg = "https://www.travel-xperience.com/sites/default/files/portada_destino_0.jpeg"

  person = signal({
    name:'Juanpa',
    age: 18,
    avatar: 'https://www.travel-xperience.com/sites/default/files/portada_destino_0.jpeg'
  })

  name = signal("Daniel")
  numberResult = signal(0)

  colorCtrl = new FormControl();
  widthCtrl = new FormControl();
  nameCtrl = new FormControl('Juana Saltitona', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  }
  );

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  clickHandler(){
    alert("CUIDAO")
  }

  changeHandler(event: Event){
    console.log(event);
  }

  changeTextInput(event: Event){
    const elementInput = event.target as HTMLInputElement;
    this.valueInput = elementInput.value;
  }

  keyupHandler(event: KeyboardEvent){
    const elementInput = event.target as HTMLInputElement;
    this.valueInput = elementInput.value;
    console.log(this.valueInput);
  }

  increase(){
    this.numberResult.update((value) => value + 1);
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newAge = input.value;
    this.person.update(prevalue => {
      return {
        ...prevalue,
        age: +newAge
      }
    });
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.person.update(prevalue => {
      return {
        ...prevalue,
        name: newName
      }
    });
  }

}
