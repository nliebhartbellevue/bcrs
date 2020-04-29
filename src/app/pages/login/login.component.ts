/**
 * Title: pages/login/login.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  loginForm: FormGroup;
  hide: boolean;
  focus;
  focus1;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    console.log('Login form on submit');
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    setTimeout(() => {
      this.auth.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }
}
