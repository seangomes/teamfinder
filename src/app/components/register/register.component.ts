import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from "../users/User";
import { AuthService } from '../../providers/auth/auth.service';
import { Country } from '../../models/Country';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private message: string = '';
  imagePreview = null;

  countries : Country[] = [
    {countryId : "1", name: "Denmark"},
    {countryId : "2", name: "Germany"},
    {countryId : "3", name: "France"}
  ]

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    let loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === '') {
      this.router.navigateByUrl('/home');
    }

    this.auth.isLoggedIn$.subscribe((data) => {
      if (data) {
        router.navigateByUrl('/home');
      }
    });
   }

  ngOnInit() {
    //init validation form
    this.createRegisterForm();
  }

  createRegisterForm() {
    //Validator login form model
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required],  Validators.minLength(2)],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confpassword: ['', [Validators.required, Validators.minLength(5)]],
      firstname: [''],
      lastname: [''],
      photoURL: [''],
      age: ['']
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.registerForm.get('photoURL').setValue({
          fileName: file.name,
          filtype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  clearFile() {
    this.imagePreview = null;
  }

}
