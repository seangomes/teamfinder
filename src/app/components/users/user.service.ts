import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  public message: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private afs: AngularFirestore) { }

  data = [];

  getAllUser(): Observable<User[]> {
    const usersCollectionRef: AngularFirestoreCollection<User> = this.afs.collection('users');
    const collection$: Observable<User[]> = usersCollectionRef.valueChanges();
    return collection$;
  }

  getUserById(userId: string): Observable<User> {
    const documentRef: AngularFirestoreDocument<User> = this.afs.doc('items/' + userId);
    const userDoc$: Observable<User> = documentRef.valueChanges();
    return userDoc$;
  }

  createUser(user: User): Promise<any> {
    //create user in firebase email & password section
    return this.afs.app.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(function (data) {
        //Successfully created user in firebase auth db
        //Create custom user in own firebase DB
        const usersCollectionRef: AngularFirestoreCollection<User> = this.afs.collection('users');

        const id = this.afs.createId();
        user.uid = id;
        const date = new Date().getDate();
        user.createdAt = date;

        const newUser: User = user;

        usersCollectionRef.add(user).then(function (data) {
          console.log(data);
        });
      }).catch(function (error) {
        let errorCode = error.code;
        var errorMessage = error.message;

        switch (errorCode) {
          case 'auth/email-already-in-use':
          return "Email allready in use";
          case 'auth/invalid-email':
            return "Email address is not valid";
          case 'auth/operation-not-allowed':
            return "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console";
          case 'auth/weak-password':
            return "Password is not strong enough";
          default:
            return "DEFAULT switch error";
        };
      })




  }

  editUser(user: User): void {
    return null;
  }

  deleteUser(user: User): void {
    return null;
  }

}
