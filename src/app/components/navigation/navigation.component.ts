import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../providers/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private isLoggedIn : boolean = false;

  constructor(private auth : AuthService) {

    this.auth.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    });
   }

  ngOnInit() {

  }

  signout() : void {
    this.auth.signout();
  }

}
