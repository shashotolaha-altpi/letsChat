import { Injectable } from '@angular/core';
import { AngularFireAuth  } from "@angular/fire/compat/auth";
import { Auth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  user$ = this.fireauth.authState.pipe 

  constructor(
    private auth: Auth,
    private fireauth: AngularFireAuth,
    private router: Router,
    private route:ActivatedRoute
    ) {
      
    }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }


  googleLogin(){
    const googleprovider = new GoogleAuthProvider
    return this.fireauth.signInWithPopup(googleprovider).then((e) => {
      this.router.navigate(['../letsChat'], {
        relativeTo: this.route.parent,
      });
      localStorage.setItem('token', JSON.stringify(e.user?.uid));
      console.log("User signed in:", e.user);
    }).catch((error) => {
      if (error.code === "auth/cancelled-popup-request") {
        // Handle popup cancellation
        console.log("Popup request was cancelled by the user.");
      } else {
        // Handle other authentication errors
        console.error("Authentication error:", error);
      }
    });
  }
  
   

  logout(){
    return from(this.auth.signOut());
  }
}
