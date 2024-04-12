import { routes } from './../app.routes';
import { Component, Inject, Signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { counterStore } from '../signalStore/counter.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  username: any;

  constructor(public routes: Router) {
    var data: any = localStorage.getItem('SignUp Credentials');
    var user = JSON.parse(data);
    //  this.username=user[0].Username;
  }
  displayName: any;
  ngOnInit() {
    var loginUser: any = localStorage.getItem('LoginUser');

    var parseName=JSON.parse(loginUser);
    this.displayName = parseName.Username;
    console.log('LoginUser', this.displayName );
  }

  countApp() {
    this.routes.navigate(['CountApp']);
  }

  toDoApp() {
    this.routes.navigate(['todolist']);
  }

  onLogout() {
    this.routes.navigate(['']);
  }





}

