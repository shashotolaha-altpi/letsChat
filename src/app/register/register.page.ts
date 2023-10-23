import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerFormDetail: any;
  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.registerFormDetail = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  register(e: Event) {
    if (!this.registerFormDetail.valid) return;
    const user = this.registerFormDetail.value;
    this.authservice
      .registerWithEmailAndPassword(user)
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
    this.authservice
      .signInWtihGoogle()
      .then((res: any) => {
        this.router.navigate(['../letsChat'], {
          relativeTo: this.route.parent,
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

}
