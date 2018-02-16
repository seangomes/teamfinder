import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(private afs: AngularFirestore) { }



  getAllUser() : Observable<User[]> {
    const usersCollectionRef : AngularFirestoreCollection<User> = this.afs.collection('users');
    return usersCollectionRef.valueChanges();
  }

  getUserById(userId: string) : Observable<User> {
    return null;
  }

  createUser(user: User) : Observable<User> {
    return null;
  }

  editUser(user: User) : void {
    return null;
  }

  deleteUser(user: User) : void {
    return null;
  }

}
