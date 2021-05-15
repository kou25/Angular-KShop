import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';
import { AppUser } from 'src/app/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }


  //save user data in db

  save(user: firebase.User){
    this.db.object('/user/'+user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string):AngularFireObject<AppUser>{
    return this.db.object('/user/'+uid)
  }
  
}
