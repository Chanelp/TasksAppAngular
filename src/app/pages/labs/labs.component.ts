import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'universo';
  tasks = [
    "Learn English",
    "Read a book",
    "Help with homeworks",
    "Programming"
  ];

  valueInput = ''

  nombre = "Lisa Simpsom"
  pais = "Jamaica"
  habilitado = true
  urlImg = "https://www.travel-xperience.com/sites/default/files/portada_destino_0.jpeg"

  person = {
    name:'Juanpa',
    age: 18,
    avatar: 'https://www.travel-xperience.com/sites/default/files/portada_destino_0.jpeg'
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
}
