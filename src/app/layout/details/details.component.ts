import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [routerTransition()]
})
export class DetailsComponent implements OnInit {

  RESPONDENT: any = {};
  //detailsForm: any;
  myForm: FormGroup;
  myForms = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  @ViewChild('detailsForm') detailsForm: NgForm;

  gotoAssessment(){
    if(this.detailsForm.valid){
      console.log("success")
      this.router.navigate(['/form']);
    }
    else{
      alert("Please provide inputs in all fields!")
    }
  }
}
