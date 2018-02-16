import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../user.service";
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { ISubscription } 
import { User } from "../User";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  private users : User[];
  private usersSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usersSubscription = this.getAllUser().subscribe(data => this.users = data);
  }

  getAllUser() {
    return this.userService.getAllUser();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}
