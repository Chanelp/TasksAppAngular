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
}
