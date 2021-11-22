import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-tier1admindashboard',
  templateUrl: './tier1admindashboard.component.html',
  styleUrls: ['./tier1admindashboard.component.scss']
})
export class Tier1admindashboardComponent implements OnInit {

  constructor(private toastr: ToastrService, private CONSTANT: Constant,
    private router: Router, private HTTPSERVICE: HttpService, private httpclient: HttpClient) { }
  getAPPSubscription: any;
  CustomerData: any[] = [];
  RespondentData: any[] =[];
  ngOnInit(): void {
    // const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.QUESTION_API);
    // this.getAPPSubscription = getSubscribe.subscribe(
    //   (data: any) => {
    //     this.fetchdata = data;
    //     console.log(this.fetchdata);
    //   },
    // );
    const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.CUSTOMER_API);
    this.getAPPSubscription = getSubscribe.subscribe(
      (data: any) => {
        this.CustomerData = data;
        console.log(this.CustomerData[1].Organization);
      },
    );
    const getSubscribe1= this.HTTPSERVICE.get(this.CONSTANT.RESPONDENT_API);
    this.getAPPSubscription = getSubscribe1.subscribe(
      (data: any) => {
        this.RespondentData = data;
        console.log(this.CustomerData[1].Organization);
      },
    );
    
  }

  userBool: boolean = true;
  scopeBool: boolean = false;
  roleBool: boolean = false;
  NewBool: boolean = true;
  ScheduledBool: boolean = false;
  CompletedBool: boolean = false;
  showDetailsBool: boolean = false;
  User2Bool: boolean = false;
  User1Bool:boolean = true;
  setActiveDiv(div) {
    if (div == 1) {
      this.userBool = true;
      this.scopeBool = false;
      this.roleBool = false;
    }
    else if (div == 2) {
      this.userBool = false;
      this.scopeBool = true;
      this.roleBool = false;
    }
    else if (div == 3) {
      this.userBool = false;
      this.scopeBool = false;
      this.roleBool = true;
    }
  }
  setActiveParamDiv(param) {
    if (param == 1) {
      this.NewBool = true;
      this.ScheduledBool = false;
      this.CompletedBool = false;
    }
    else if (param == 2) {
      this.NewBool = false;
      this.ScheduledBool = true;
      this.CompletedBool = false;
    }
    else if (param == 3) {
      this.NewBool = false;
      this.ScheduledBool = false;
      this.CompletedBool = true;
    }
  }
  showCustomerDetails() {
    this.showDetailsBool = true;
  }

  // getQuestion() {
  //   const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.QUESTION_API);
  //   this.getAPPSubscription = getSubscribe.subscribe(
  //     (data: any) => {
  //       this.fetchdata = data;
  //       console.log(this.fetchdata);
  //     },
  //   );
  // }

  // getCustomer() {
  //   const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.CUSTOMER_API);
  //   this.getAPPSubscription = getSubscribe.subscribe(
  //     (data: any) => {
  //       this.fetchdata = data;
  //       console.log(this.fetchdata);
  //     },
  //   );
  // }
  gotoiassessment() {
    this.router.navigate(['/iassessment']);
  }
  gotoquestionselection(){
    this.router.navigate(['/questionselection']);
  }
}
