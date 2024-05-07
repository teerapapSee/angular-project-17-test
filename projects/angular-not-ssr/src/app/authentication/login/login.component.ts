import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MiddlewareService } from '../../shares/services/middleware.service';
import { StoreService } from '../../shares/store/store.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,OnDestroy{

  router : Router
  middleware : MiddlewareService;
  store : StoreService;
  subscribeLoginApi = new Subscription();
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,Validators.required),
    remember: new FormControl(false)
  })
  hidePassword = true;
  constructor(private injector: Injector) {
    this.router = this.injector.get(Router);
    this.middleware = this.injector.get(MiddlewareService);
    this.store = this.injector.get(StoreService);
    
  }

  ngOnInit(){
    // this.login()
  }

  ngOnDestroy(): void {
    this.subscribeLoginApi.unsubscribe()
  }

  submitLoginForm(){
    console.log('=======loginForm.valid ',this.loginForm.valid)
  }

  login(){
    const self = this
    this.subscribeLoginApi = this.middleware.callApiFn('auth/login','post',{
      "email":"teerapap.see@gmail.com",
      "password": "1234"
    },{},true,false,true).subscribe({
      next:(response) => {
        self.store.stateActionFn('tokenAction',response.playload.token)
        self.store.stateActionFn('systemExpAction',response.playload.system_exp)
        this.router.navigate([''])
      },
      error:(error)=>{
        console.log("LoginComponent  login  error:", error.error)
      }
    })

  }
}
