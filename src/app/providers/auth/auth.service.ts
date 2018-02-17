import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { User } from "../../components/users/User";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private user : User = {
    email : "sean@test.dk",
    password : "hejhej",
    photoURL : "",
    uid: "1",
    username: "zuljinzu",
    status: "online",
    firstname: "Sean",
    lastname: "Gomes",
    country: "Denmark",
    age:32,
    clanId: "",
    createdAt: 1
  }

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
  private isLoggedInSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ : Observable<boolean> = this.isLoggedInSubject.asObservable();
  constructor(private router: Router) {

   }

  getUserInfo() : User {
    return this.userSubject.getValue();
  }

  isLoggedIn(): Observable<boolean> {
    let user = localStorage.getItem('currentUser');
    if(user !== null){
      this.userSubject.next(JSON.parse(user));
      this.isLoggedInSubject.next(true);
    }else {
      this.isLoggedInSubject.next(false);
    }
    return this.isLoggedInSubject.asObservable();
  }

  //Email + password login
  login(email: string, password: string) : string {
    if(email.trim().toLowerCase() === this.user.email.trim().toLowerCase() && password.trim().toLowerCase() === this.user.password.trim().toLowerCase())
    {

      let userObj : User ={
        email: this.user.email,
        photoURL:this.user.photoURL,
        status: this.user.status,
        uid: this.user.uid,
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        country: this.user.country,
        age: this.user.age,
        clanId: this.user.clanId,
        createdAt: this.user.createdAt,
        password: this.user.password
      }

      this.isLoggedInSubject.next(true);
      this.userSubject.next(userObj);

      //Setting local storage
      localStorage.setItem('currentUser', JSON.stringify(userObj));

      this.router.navigateByUrl("/home");
    }else{
      this.userSubject.next(new User);
      return "Wrong email or password";
    }
  }

  signout() : void {
    this.userSubject.next(new User);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
