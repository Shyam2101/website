import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss',
  encapsulation:ViewEncapsulation.None
,
})
export class CreditsComponent {


  constructor(public routes :Router){

  }


  onBack(){

    this.routes.navigate(['layout'])
  }
}
