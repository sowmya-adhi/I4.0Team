import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-iassessment',
  templateUrl: './iassessment.component.html',
  styleUrls: ['./iassessment.component.scss'],
  animations: [routerTransition()]
})
export class IassessmentComponent implements OnInit {

  CUSTOMER: any = {};
  organization:string = '';
  errorBool: boolean = false;
  myForm: FormGroup;
  myForms = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });
  getAPPSubscription: any;
  assessmentarea_data: any[] = [];

  constructor(
    private router: Router,
    private HTTPSERVICE: HttpService,
    private httpclient: HttpClient,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService, private CONSTANT: Constant
    ) {
     }

  ngOnInit(): void {
      // const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.ASSESSMENT_AREA_API);
      // this.getAPPSubscription = getSubscribe.subscribe(
      //   (data: any) => {
      //     this.assessmentarea_data = data;
      //     console.log(this.assessmentarea_data);
      //   },
      // );
    
  }

  @ViewChild('scopeForm') scopeForm: NgForm;

  public geography_array: any = [
    { geography: ""},
    { geography: "Africa"},
    { geography: "Asia/Pacific Islands"},
    { geography: "Australia / New Zealand"},
    { geography: "Canada"},
    { geography: "China"},
    { geography: "Europe"},
    { geography: "Middle East"},
    { geography: "Mexico/Central/S. America"},
    { geography: "South Asia (Incl. India, Pakistan)"},
    { geography: "United Kingdom"},
    { geography: "United States"}
  ];

  public assessment_scope_array:any = [
    { scope: ""},
    { scope: "Whole organization"},
    { scope: "Business Unit"},
    { scope: "Region"}
  ];

  public sector_array:any = [
    { sector: ""},
    { sector: "Financial services"},
    { sector: "Insurance"},
    { sector: "Consulting/professional services"},
    { sector: "Software/Internet"},
    { sector: "Telecommunications"},
    { sector: "Healthcare"},
    { sector: "Manufacturing (non-computer)"},
    { sector: "Retail/wholesale/distribution"},
    { sector: "Government"},
    { sector: "Education"},
    { sector: "Pharmaceuticals"},
    { sector: "Media/publishing/entertainment"},
    { sector: "Utilities"},
    { sector: "Hospitality/travel"},
    { sector: "Transportation/logistics"},
    { sector: "Computer/network manufacturing"},
    { sector: "Online retail"},
    { sector: "Other"},
  ];

  public cloud_provider_array:any = [
    { cloud_provider: ""},
    { cloud_provider: "Amazon"},
    { cloud_provider: "Microsoft"},
    { cloud_provider: "IBM"},
    { cloud_provider: "Google"},
    { cloud_provider: "SAP"},
    { cloud_provider: "Snowflake"},
    { cloud_provider: "Oracle"},
    { cloud_provider: "Teradata"},
    { cloud_provider: "Other"},
    { cloud_provider: "Don't know"},
    { cloud_provider: "Not applicable"}
  ]

  gotoDetails(){
    console.log(this.CUSTOMER);
    if(this.scopeForm.valid){
      const getSubscribe = this.HTTPSERVICE.post(this.CONSTANT.CUSTOMER_API,{
        "Organization": this.CUSTOMER.organization,
          "Business_Unit":this.CUSTOMER.business_unit,
          "Org_size":this.CUSTOMER.org_size,
          "Scope":this.CUSTOMER.assessment_scope,
          "Sector":this.CUSTOMER.sector,
          "Cloud_provider":this.CUSTOMER.cloud_provider,
          "Geography":this.CUSTOMER.geography,
          "Key_components":this.CUSTOMER.key_components
      });
      getSubscribe.subscribe((data: any)=>{
        console.log(data);
        this.router.navigate(['/tier1admindashboard']);
      });
      console.log("Inserted Data");
      
    }
    else{
      alert("Please provide inputs in all fields!")
    }
    
    
  }

  
}
