import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { User } from "../users/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private message: string = '';
  private isLoggedIn: boolean = false;
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
    this.createLoginForm();
  }

  createLoginForm() {
    //Validator login form model
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login({ value, valid }: { value: User, valid: boolean }) {

    let trimmedEmail = value.email.trim();
    let trimmedPassword = value.password.trim();

    if (trimmedEmail != "" || trimmedEmail != undefined && trimmedPassword != "" || trimmedPassword != undefined) {
      let message: string = this.auth.login(trimmedEmail, trimmedPassword);
      if (message != '') {
        this.message = message;
      }
    }
  }

}
