import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Auth, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afs: AngularFireAuth,
    private auth: Auth) {}

  signInWtihGoogle() {
    
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  registerWithEmailAndPassword(user: { email: string; password: string }) {
    // return this.afs.createUserWithEmailAndPassword(user.email, user.password);
    return from(createUserWithEmailAndPassword(this.auth,user.email, user.password));
  }
  loginWithEmailAndPassword(user: { email: string; password: string }) {
    // return this.afs.signInWithEmailAndPassword(user.email, user.password);
    return from(signInWithEmailAndPassword(this.auth,user.email,user.password))
  }

  // googleLogin(){
  //   const googleprovider = new GoogleAuthProvider
  //   return this.fireauth.signInWithPopup(googleprovider).then((e) => {
  //     this.router.navigate(['../letsChat'], {
  //       relativeTo: this.route.parent,
  //     });
  //     localStorage.setItem('token', JSON.stringify(e.user?.uid));
  //     console.log("User signed in:", e.user);
  //   }).catch((error) => {
  //     if (error.code === "auth/cancelled-popup-request") {
  //       // Handle popup cancellation
  //       console.log("Popup request was cancelled by the user.");
  //     } else {
  //       // Handle other authentication errors
  //       console.error("Authentication error:", error);
  //     }
  //   });
  // }
}
