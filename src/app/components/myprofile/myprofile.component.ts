import { Component, OnInit } from '@angular/core';
import { User } from '../users/User';
import { AuthService } from "../../providers/auth/auth.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  public user : User;
  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserInfo()
    if(this.user) {
      console.log(this.user);
    }
  }
}
