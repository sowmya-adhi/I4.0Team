
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../../config/constant';
import { DasboardConstant } from '../../../config/dashboardconstants';
import { HttpService } from '../../../config/http.service';
import { routerTransition } from '../../../router.animations';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [routerTransition()]
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    @Input() text: string;
    @Output() searchValue = new EventEmitter;


    filterValue = '';
    public userName: any;
    public role: any;

    userdetails = false;
    userinfo: any;
    getAPPSubscription: any;

    constructor(private translate: TranslateService, public router: Router, public dashboardconstant: DasboardConstant,
        private toastr: ToastrService, private CONSTANT: Constant,
        private HTTPSERVICE: HttpService, private httpclient: HttpClient) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }
    twinapp: string = this.CONSTANT.TWIN_APP;
    ngOnInit() {
        this.getUserDetails();
        this.pushRightClass = 'push-right';
        this.getApp();
        this.getLatestEvent();

    }
    public getUserDetails() {
        if (localStorage.getItem('userdetails') != null) {
            this.userinfo = JSON.parse(localStorage.getItem('userdetails'));
            this.userName = this.userinfo.userName;
            //this.router.navigate(['/overview360']);
        }
        else {
            this.router.navigate(['/login']);

        }

    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('userdetails');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
    filter() {
        this.searchValue.emit(this.filterValue)
    }

    fetchdata: any[] = [];
    getApp() {
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.APPLICATION_API);
        this.getAPPSubscription = getSubscribe.subscribe(
            (data: any) => {
                this.fetchdata = data;
            },
            (err: any) => {
                console.log("error", err.status)
                if (err.status == 403) {
                    this.router.navigate(['/login']);
                }
                else {
                    console.log("known error")
                }
            }
        );
    }
    //notifications
    eventCount: any;
    eventArray: any[];
    getLatestEvent() {
        var startOfDayString;
        var endOfDayString;
        var startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        startOfDayString = new Date(new Date(startOfDay).toUTCString()).toISOString();
        var endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        endOfDayString = new Date(new Date(endOfDay).toUTCString()).toISOString();
        startOfDayString = startOfDayString.replaceAll(":", "%3A");
        endOfDayString = endOfDayString.replaceAll(":", "%3A");
        this.HTTPSERVICE.get(this.CONSTANT.GET_LAST10_EVENTS + "?event_type=push&limit=10").subscribe(
            (data: any) => {
                this.eventCount = data.length;
                this.eventArray = data;
                console.log("data", this.eventArray)
            }
        );
    }
}
