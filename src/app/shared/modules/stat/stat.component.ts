import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
//    public label;
  showPortal = false;
    showMore=false;
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() link:string;
    @Input() kpi: string;
    @Input() image:string;
    @Input() type:string;
    @Output() event: EventEmitter<any> = new EventEmitter();
  
    public alerts: Array<any> = [];
    
    dialogInput: string;
    constructor() {
//this.getApp();
    }

    ngOnInit() {
       
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    exampleModal1(){
        const buttonModal = document.getElementById("openModalButton")
        console.log('buttonModal', buttonModal)
        buttonModal.click()
      }
  
}
