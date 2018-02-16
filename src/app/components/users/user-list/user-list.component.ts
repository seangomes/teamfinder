import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { User } from "../User";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private users$ : Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getAllUser() {
    this.userService.getAllUser();
  }

}
