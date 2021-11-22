import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private HTTPSERVICE: HttpService,
    private httpclient: HttpClient,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService){ }

  ngOnInit(): void {
  }
  organizational: boolean = true;
  data: boolean = false;
  infrastructure: boolean = false;
  analytics: boolean = false;
  itOperations: boolean = false;

  setActiveDiv(div) {
    if (div == 1) {
      this.organizational = true;
      this.data = false;
      this.infrastructure = false;
      this.analytics = false;
      this.itOperations = false;
    }
    else if (div == 2) {
      this.organizational = false;
      this.data = true;
      this.infrastructure = false;
      this.analytics = false;
      this.itOperations = false;
    }
    else if (div == 3) {
      this.organizational = false;
      this.data = false;
      this.infrastructure = true;
      this.analytics = false;
      this.itOperations = false;
    }
    else if (div == 4) {
      this.organizational = false;
      this.data = false;
      this.infrastructure = false;
      this.analytics = true;
      this.itOperations = false;
    }
    else if (div == 5) {
      this.organizational = false;
      this.data = false;
      this.infrastructure = false;
      this.analytics = false;
      this.itOperations = true;
    }
  }

  
  @ViewChild('generalForm') generalForm: NgForm;
  editAssetTypeDetails(form: NgForm) {
    let array = [];
    array.push({
      "asset_type_name": form.value.asset_type_name,
      "asset_type_desc": form.value.asset_type_desc
    });

}}
