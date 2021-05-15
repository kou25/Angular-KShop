import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from '../user/user.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>; 

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl)
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
   .pipe(switchMap(user=> {
     if(user){
      return this.userService.get(user.uid).valueChanges();
     } 
      else{
        return of(null);
      }
       }))
  }
}
