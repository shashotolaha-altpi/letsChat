import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  loginForm: any;
  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}
 
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  
  submitHandler() {
    console.log(this.loginForm.value)
    if (!this.loginForm.valid) return;
    const user = this.loginForm.value;
    this.authservice
      .loginWithEmailAndPassword(user)
    .pipe(
      this.toast.observe({
        success: 'logged in successfully',
        loading: 'Loading...',
        error: 'email and password not match',
        
      }),
      )
      .subscribe(() => {
        this.router.navigate(['../letsChat'], {
          relativeTo: this.route.parent,
        });
    });
  }

  
  googleauthlogin() {
    this.authservice
      .signInWtihGoogle()
      .then((res: any) => {
        this.router.navigate(['../letsChat'], {
          relativeTo: this.route.parent,
        });
      })
      .catch((err: any) => {
        if (err.code === "auth/cancelled-popup-request") {
                // Handle popup cancellation
                console.log("Popup request was cancelled by the user.");
              } else {
                // Handle other authentication errors
                console.error("Authentication error:", err);
              }
      });
  }
}
