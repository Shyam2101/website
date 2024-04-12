import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from './../app.routes';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  providers: [ApiService],
  styleUrl: './table.component.scss',
})
export class TableComponent {
  username: any;
  getEdited: any = [];
  error = null;

  arr1: any = [
    {
      firstname: 'shyam',
      lastname: 'sundhar',
      age: '21',
    },
    {
      firstname: 'guna',
      lastname: 'sekaran',
      age: '25',
    },
    {
      firstname: 'vinoth',
      lastname: 'kumar',
      age: '25',
    },
    {
      firstname: 'santhosh',
      lastname: 'gandhi',
      age: '23',
    },
  ];

  title: any;
  subtitle: any;
  userArray: any;
  data: any = {};
  firstname: string = '';
  summary: any;
  addForm!: FormGroup;
  searchText: any;

  constructor(
    public route: Router,
    private service: ApiService,
    private form: FormBuilder
  ) {
    // onEdit(receive:any){
    //   this.route.navigate(['edit/'+receive]);
    //  localStorage.setItem('edit',JSON.stringify(this.arr1))  // to set item in local storage
    // }
  }

  ngOnInit() {
    // this.getvalue();

    this.addForm = this.form.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      age: new FormControl(''),
    });

    if (localStorage.getItem('edit')) {
      let data: any = localStorage.getItem('edit');
      data = JSON.parse(data);
      this.arr1 = data;
      console.log(data);
    }
  }

  // getvalue(){
  //   this.service.getvalue().subscribe((response:any)=>{

  //     this.title=response.title;
  //     this.subtitle=response.subtitle;
  //     this.userArray=response;
  //     console.log(this.userArray);

  //   })
  // }

  addSummary() {
    if (this.addForm.valid) {
      var data: any = {
        firstname: this.addForm.controls['firstname'].value,
        lastname: this.addForm.controls['lastname'].value,
        age: this.addForm.controls['age'].value,
      };

      this.arr1.push(data);
      localStorage.setItem('edit', JSON.stringify(this.arr1));
    }
  }

  onEdit(receive: any) {
    this.data = receive;
    console.log(receive);
    this.firstname = this.data.firstname;
  }

  onSave() {
    localStorage.setItem('edit', JSON.stringify(this.arr1));
  }
  onDelete(firstname: any) {
    var index = this.arr1.findIndex(
      (a: { firstname: any }) => a.firstname == firstname
    );
    console.log(index);

    this.arr1.splice(index, 1);
  }

  onChange(event: any) {
    this.searchText = event.target.value;
    if(event.target.value=""){
      this.arr1=this.arr1
    }
  }

  onSearch() {
    this.arr1.filter((s: any) => {
      if (s.firstname == this.searchText) {
        console.log(s);
        this.arr1 = [];
        this.arr1.push(s)
      }
    });
  }
}
