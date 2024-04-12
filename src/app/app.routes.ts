import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LayoutComponent } from './layout/layout.component';
import { CounterComponent } from './counter/counter.component';
import { ToDoAppComponent } from './to-do-app/to-do-app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TableComponent } from './table/table.component';
import { TableApiComponent } from './table-api/table-api.component';
import { CreditsComponent } from './credits/credits.component';

export const routes: Routes = [
  {path:'',component:LoginpageComponent},
  {path:'layout',component:LayoutComponent},
  {path:'CountApp',component:CounterComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'todolist',component:ToDoAppComponent},
  {path:'projects',component:ProjectsComponent},
  {path:'calc',component:CalculatorComponent},
  {path:'table',component:TableComponent},
  {path:'tableApi',component:TableApiComponent},
  {path:'credits',component:CreditsComponent},
];
