import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FollowService {

  constructor(private afs: AngularFirestore) { }

  getFollowers(userId : string) {
    //Used to build follower count
    return this.afs.collection(`followers/${userId}`);
  }

  getFollowing(followerId:string, followedId:string) {
    // Used to see if UserFoo if following UserBar
    return this.afs.collection(`following/${followerId}/${followedId}`)
  }

  follow(followerId: string, followedId: string) {
      this.afs.collection('followers/').doc(followerId).update({ [followerId]: true });
      this.afs.collection('following/').doc(followedId).update({ [followedId]: true });
  }

  unfollow(followerId: string, followedId: string) {
    this.afs.collection(`followers/${followedId}`).doc(followerId).delete();
    this.afs.collection(`following/${followerId}`).doc(followedId).delete();
  }
}
