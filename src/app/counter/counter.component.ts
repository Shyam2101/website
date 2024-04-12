import { Component, inject } from '@angular/core';
import { counterStore } from '../signalStore/counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers:[counterStore]
})
export class CounterComponent {
  counterStore=inject(counterStore);

}
