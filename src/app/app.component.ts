import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private auth: AuthService, router: Router, private userService: UserService){

  

   auth.user$.subscribe(user=>{
     if(user){
      //pass user data for updation in db
      userService.save(user);
      
      //redirect url works here !
      let returnUrl= localStorage.getItem('returnUrl');
      router.navigateByUrl(returnUrl)
     }
   })
 }
}
