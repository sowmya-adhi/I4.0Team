import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpService } from '../config/http.service';
import { Constant } from '../config/constant';
import { UserModelAuth,UserDetails } from '../model/user_model';
import { ToastrService } from 'ngx-toastr';

import { DasboardConstant } from '../config/dashboardconstants';

import { Observable } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {   
  showloader: boolean = false;
  LoginForm: FormGroup;
  loginError : boolean = false;
  constructor(private toastr: ToastrService,private CONSTANT: Constant, private router: Router,
     private HTTPSERVICE: HttpService ,private formBuilder: FormBuilder) { }
    LoginSubscription:any;
    userName='';
    password='';
   
    ngOnInit() {this.LoginForm = this.formBuilder.group({
        userName: [''], 
        password: ['']
      });}

    onLoggedin( ) {    
    //localStorage.setItem('isLoggedin', 'true');
    
    
        var formobj = this.LoginForm.value;
        var user = new UserModelAuth();
        user.userName = formobj.userName;
        user.password = formobj.password;  
        
      
        const usertoken = localStorage.setItem('userdetails', JSON.stringify(user));
   // console.log("user ", JSON.stringify(user));
        const LoginSubscribe = this.HTTPSERVICE.login(this.CONSTANT.LOGIN_API,JSON.stringify(user));
        this.LoginSubscription = LoginSubscribe.subscribe(
            (data: any) => {
            
                     var user = new UserDetails();
                     user.access_Token =  data.access_Token;
                     user.token_type = data.token_type;
                     user.expires_in = data.expires_in;
                     user.refresh_token = data.refresh_token;
                     user.id = data.id;
                    user.userName = data.userName;
                    user.email=data.email;                 
                    user.scope = data.scope;
                    user.roles = data.roles; 
                     const usertoken = localStorage.setItem('userdetails', JSON.stringify(user));
                    this.router.navigate(['/overview360']);  
                      
                   
            },
            (error: any) => {
                this.loginError = true;
                     
            }
        );

    } /* else {
        
        alert('User form is not valid!!');
        
    } */
    }   