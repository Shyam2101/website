import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginpageComponent {


  //declarations

  signupForm!: FormGroup;
  loginForm!: FormGroup<any>;
  apiService: any;
  arr1: any = [];

  isLoginMode = true;
  temp: any;
  arr2: any = [];
  Mail: any;
  isconfirmpassword: boolean = true;
  isSubmitted: boolean = false;
  isTrueMail: boolean = false;

  // for password validation declaration
  isPasswordValidator: boolean = true;
  isLowerCase: boolean = true;
  isUpperCase: boolean = true;
  isNumber: boolean = true;
  isMinChar: boolean = true;
  isSpecialChar: boolean = true;

  // to save signup form details
  signUpArray: any = [];
  loginUserArray:any=[];
  isLoading: boolean=false;

  constructor(public router: Router) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      USERNAME: new FormControl('', [Validators.required]), //to validate form
      PASSWORD: new FormControl('', [Validators.required]),
    });

    this.signupForm = new FormGroup({
      //setting form group and form group controls
      USERNAME: new FormControl('', [Validators.required]), //to validate form
      PASSWORD: new FormControl('', [Validators.required]), //to validate form
      EMAIL: new FormControl('', [Validators.required, Validators.email]),
      CONFIRMPASSWORD: new FormControl('', [Validators.required]),
    });

  }


  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isSubmitted=false
  }

  login() {
    // if(this.loginForm.valid)    // to check field is valid or invalid using ".valid" it returns true or false
    this.isLoading=true;
    if (this.isLoginMode == true) {

      this.isSubmitted=true;
      if(this.loginForm.valid){

        this.isSubmitted=false;
        var credential: any = localStorage.getItem('SignUp Credentials');
        credential = JSON.parse(credential);
        console.log(credential);

       var user= credential.find((c:any)=>c.Username==this.loginForm.controls['USERNAME'].value)
       console.log(user);
       this.loginUserArray=localStorage.setItem("LoginUser",JSON.stringify(user))
       console.log("loginUser :",this.loginUserArray);


       if(user && user.Password==this.loginForm.controls['PASSWORD'].value){

        setTimeout(() => {
          this.isLoading=false;
          this.router.navigate(['layout'])
        }, 2000);

       }
       else{
        this.isLoading=false;
        alert('invalid')
       }
      }else{
        this.isLoading =false;
      }

      //for signup page button
    } else {
      this.isSubmitted = true;
      var email = this.signupForm.controls['EMAIL'].value;
      console.log(email);
      if (email != null && email != undefined && email != '') {
        this.temp = email.split('.'); // to split email by '.'
        console.log(this.temp);

        var part1 = this.temp[0];
        console.log(part1);
        var cut = part1.slice(0, 2); //slicing the first  char from string
        console.log(cut);

        var modifiedpart1 = ''; //declared empty varable
        for (
          var i = 2;
          i < part1.length;
          i++ // looping part1 till the length of it from 2nd character
        ) {
          modifiedpart1 += '*'; // till the length of string from 2nd char ... it will assign as star "*"
        }
        console.log(modifiedpart1);

        var ProtectedMail = cut + modifiedpart1 + '.' + this.temp[1]; //adding sliced char + stars + splited string
        console.log(ProtectedMail);

        this.Mail = ProtectedMail;
        console.log(this.Mail);




        console.log(this.signupForm); // to console signupForm properties
      } else {
        this.isTrueMail = true;
      }

      //to check password = confirm password
      if (
        this.signupForm.controls['PASSWORD'].value &&
        this.signupForm.controls['PASSWORD'].value != '' &&
        this.signupForm.controls['CONFIRMPASSWORD'].value &&
        this.signupForm.controls['CONFIRMPASSWORD'].value != ''
      ) {
        if (
          this.signupForm.controls['PASSWORD'].value ==
          this.signupForm.controls['CONFIRMPASSWORD'].value
        ) {
          this.isconfirmpassword = true;
        } else {
          this.isconfirmpassword = false;
        }
      }
    }

    var pass = this.signupForm.controls['PASSWORD'];
    console.log(pass);

    console.log(this.signupForm.value);

    // to store credentials in local storge
    var signUp = {
      Username: this.signupForm.controls['USERNAME'].value,
      Email: this.signupForm.controls['EMAIL'].value,
      Password: this.signupForm.controls['PASSWORD'].value,
    };
    if(this.signupForm.valid){
      this.signUpArray.push(signUp);
      console.log(this.signUpArray);
      if (this.signupForm.valid) {
        localStorage.setItem(
          'SignUp Credentials',
          JSON.stringify(this.signUpArray)
        );
          this.isSubmitted=false;
          this.isLoginMode = true;
          this.signupForm.reset();
    }
    }

  }

    // for key up to check password is valid based on condition
    passwordValidator(event: any) {
    console.log(event);
    console.log(event['target'].value);

    if (event.target.value != '' || event.target.value == '') {
      this.isPasswordValidator = true;

      if (/[a-z]/.test(event.target.value) == true) {
        this.isLowerCase = false;
      } else {
        this.isLowerCase = true;
      }

      if (/[A-Z]/.test(event.target.value) == true) {
        this.isUpperCase = false;
      } else {
        this.isUpperCase = true;
      }

      if (/[0-9]/.test(event.target.value) == true) {
        this.isNumber = false;
      } else {
        this.isNumber = true;
      }

      if (event.target.value.length >= 8) {
        this.isMinChar = false;
      } else {
        this.isMinChar = true;
      }
      if (/[!@#$%&]/.test(event.target.value)) {
        this.isSpecialChar = false;
      } else {
        this.isSpecialChar = true;
      }
    }
  }

}


