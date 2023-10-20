import { Component, OnInit } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: any;

  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {
    const googleprovide = new GoogleAuthProvider();
    const auth = getAuth();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submitHandler(e: Event) {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    this.authservice
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'logged in successfully',
          loading: 'Loading...',
          error: 'email and password not match',
        })
      )
      .subscribe(() => {
        this.router.navigate(['../letsChat'], {
          relativeTo: this.route.parent,
        });
      });
  }

  googleauthlogin() {
    this.authservice.googleLogin()
  }
}
