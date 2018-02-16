import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  private
  
  constructor(private afs: AngularFirestore) { }

  data = [];

  getAllUser() : Observable<User[]> {
    const usersCollectionRef : AngularFirestoreCollection<User> = this.afs.collection('users');
    const collection$: Observable<User[]> = usersCollectionRef.valueChanges();
    return collection$;
  }

  getUserById(userId: string) : Observable<User> {
    const documentRef: AngularFirestoreDocument<User> = this.afs.doc('items/' + userId);
    const userDoc$ : Observable<User> = documentRef.valueChanges();
    return userDoc$;
  }

  createUser(user: User) : void {
    const usersCollectionRef : AngularFirestoreCollection<User> = this.afs.collection('users');

    const id = this.afs.createId();
    user.uid = id;
    const date = new Date().getDate();
    user.createdAt = date;

    const newUser: User = user;

    usersCollectionRef.add(user).then(function (data) {
      console.log(data);
    });

  }

  editUser(user: User) : void {
    return null;
  }

  deleteUser(user: User) : void {
    return null;
  }

}
