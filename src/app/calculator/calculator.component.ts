import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {


  num1: any =null;
  num2: any = null;
 result: number = 0;
user: any;
values='';


  constructor(private rout:Router) { }
  ngOnInit(): void {

  }






  sum() {
    this.result = parseInt(this.num1) + parseInt(this.num2);
    console.log(this.result);


  }

  sub() {
    this.result = parseInt(this.num1) - parseInt(this.num2);
  }

  mul() {
    this.result = parseInt(this.num1) * parseInt(this.num2);

  }
  div() {
    this.result = parseInt(this.num1) / parseInt(this.num2);

  }
  exitButton(){

    this.rout.navigate(['projects'])
  }

  onkey(event: any) { // without type info
    console.log(event.key)
    if (typeof event.key === "string" ) {
      console.log('it is a string')
    }else{
      console.log('it is a number')
    }
  }

}
