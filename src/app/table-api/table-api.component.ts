import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-table-api',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './table-api.component.html',
  providers: [ApiService],
  styleUrl: './table-api.component.scss',
})
export class TableApiComponent {
  dbArray: any = [];
  addForm!: FormGroup;
  editForm!: FormGroup;
  searchText: any = '';
  toast:boolean=false;

  constructor(private service: ApiService, private form: FormBuilder) {}

  ngOnInit() {
    this.getSummary();

    this.addForm = this.form.group({
      Account_id: new FormControl(''),
      HolderName: new FormControl(''),
      Amount: new FormControl(''),
      transaction_status: new FormControl(''),
      Total_Balance: new FormControl(''),
    });

    this.editForm = this.form.group({
      _id: new FormControl(),
      Account_id: new FormControl(''),
      HolderName: new FormControl(''),
      Amount: new FormControl(''),
      transaction_status: new FormControl(''),
      Total_Balance: new FormControl(''),
    });
  }

  toggle() {}

  getSummary() {
    var obj={
      searchText:this.searchText,
    }
    this.service.getSumary(obj).subscribe(
      (Response: any) => {
        console.log(Response);
        if (Response) {
          this.dbArray = Response;
        } else {
          alert('Internal Server Error');
        }
      },
      (error) => console.log(error)
    );
  }

  addSummary() {
    if(this.addForm.valid){
      var data = {
        Account_id: this.addForm.controls['Account_id'].value,
        HolderName: this.addForm.controls['HolderName'].value,
        Amount: this.addForm.controls['Amount'].value,
        transaction_status: this.addForm.controls['transaction_status'].value,
        Total_Balance: this.addForm.controls['Total_Balance'].value,
      };
      this.service.addSummary(data).subscribe((data: any) => {
        console.log(data);
        this.addForm.reset();
        this.getSummary();
      });
    }else{
      this.toast=true;
    }

  }
  onEdit(item: any) {
    console.log(item);
    document.getElementById('myModal')!.style.display = 'block'; //to popup the edit popup
    this.editForm.controls['_id'].setValue(item._id);
    this.editForm.patchValue(item);
  }

  onDelete(item: any) {
    this.service.deletedData(item._id).subscribe((Response: any) => {
      console.log(Response);
      if (Response.code == 200) {
        this.getSummary();
      }
    });
  }

  //to edit the summary
  editSummary() {
    var data = {
      _id: this.editForm.controls['_id'].value,
      Account_id: this.editForm.controls['Account_id'].value,
      HolderName: this.editForm.controls['HolderName'].value,
      Amount: this.editForm.controls['Amount'].value,
      transaction_status: this.editForm.controls['transaction_status'].value,
      Total_Balance: this.editForm.controls['Total_Balance'].value,
    };
    this.service.update(data).subscribe(
      (res: any) => {
        console.log(res);
        this.getSummary();
          this.closePopup();


      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchChange(e: any) {
    this.searchText = e.target.value;
    if(e.target.value == "" ){
      this.searchText=""
    }
  }
  search(searchText: any) {
    var result: any;
    this.getSummary();
    console.log(result);
  }

  togglePopup() {
    document.getElementById('myModal')!.style.display = 'block';
  }
  closePopup() {
    document.getElementById('myModal')!.style.display = 'none';
  }
}
