import { Component } from '@angular/core';
import { AuthService } from "./providers/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoggedIn : boolean = false;

  constructor(private auth : AuthService, private router : Router){
    this.auth.isLoggedIn().subscribe((loggedIn => {
      this.isLoggedIn = loggedIn;
      if(!this.isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
    }));
  }
}
