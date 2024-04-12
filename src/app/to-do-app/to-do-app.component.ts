import { CommonModule } from '@angular/common';
import { routes } from './../app.routes';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';

@Component({
  selector: 'app-to-do-app',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './to-do-app.component.html',
  styleUrl: './to-do-app.component.scss'
})
export class ToDoAppComponent {

toDoArray:any=[];
list:any=signal<any>('')


  add(){
    this.toDoArray.push(this.list());
    console.log(this.list());

    console.log(this.toDoArray);



  }

  todolist(event:any){
    console.log(event);
    this.list.set(event.target.value);


  }

  delete(e:any){
    console.log(e);
    var index = this.toDoArray.findIndex((x:any) => x == e);
    console.log(index);

    this.toDoArray.splice(index,1)


  }

}
