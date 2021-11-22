import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../config/constant';
import { DasboardConstant } from '../../config/dashboardconstants';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    buttonSearch="Search";
    getAPPSubscription: any;
    //fetchdata:any[]=[]
     fetchdata:any[]=[
          {           
        'class':'Default', 
        'icon':'fa-spinner', 
        'count':'', 
        'label':'360 View', 
        'data':'Monitor manufacturing business KPIs, shop floor application and asset monitoring',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'Monitor critical Asset, Application, Database & Service parameters. Measure Business KPIs of a production line i.e. Asset uptime, Scrap, Cycle Time, OEE. Enabling closed loop incident monitoring to provide real time support to eliminate down times.',
    'image': '../../../../assets/dcc.png',
    'type':'button1',
    },
    {
        'class':'Default', 
        'icon':'fa-cogs', 
        'count':'', 
        'label':'Remote Monitoring', 
        'data':'Video analytics based worker and workplace safety solution',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'Drive compliance to PPE regulations through computer vision enabled detection and tracking Use video Analytics for compliance with social distancing guidelines during COVID-19 times Zone wise work allocation and track worker movement for each zone Proactive alerting by predicting movements of humans and vehicles within a certain proximity',
    'image': '../../../../assets/wss.png',
    'type':'button2',
    },
    {
        'class':'Default', 
        'icon':'fa-bar-chart-o', 
        'count':'', 
        'label':'Predictive Analytics', 
        'data':'Defect Detection and Quality conformity during production',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'Monitor critical Asset, Application, Database & Service parameters. Measure Business KPIs of a production line i.e. Asset uptime, Scrap, Cycle Time, OEE. Enabling closed loop incident monitoring to provide real time support to eliminate down times.',
    'image': '../../../../assets/wss.png'
    },
    
    {
        'class':'Default', 
        'icon':'fa-book', 
        'count':'', 
        'label':'Cognitive Assistance', 
        'data':'Water Network Visibility, Real time monitoring of critical assets',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'Monitor critical Asset, Application, Database & Service parameters. Measure Business KPIs of a production line i.e. Asset uptime, Scrap, Cycle Time, OEE. Enabling closed loop incident monitoring to provide real time support to eliminate down times.',
    'image': '../../../../assets/ow.png'
    },
    {
        'class':'Default', 
        'icon':'fa-group', 
        'count':'', 
        'label':'Service Friend', 
        'data':'Integrated Energy Management, Energy Audits and Energy Saving at plant and facility',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'Monitor critical Asset, Application, Database & Service parameters. Measure Business KPIs of a production line i.e. Asset uptime, Scrap, Cycle Time, OEE. Enabling closed loop incident monitoring to provide real time support to eliminate down times.',
    'image': '../../../../assets/wss.png'
    },
    {
        'class':'Default', 
        'icon':'fa-cubes', 
        'count':'', 
        'label':'Asset Manager', 
        'data':'Real time Vehicle Status - Location,performance and operational view',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'OBD solution to track vehicle health -Engine data, fuel data, battery status and Vehicle performance data Sensor tagged to vehicle IDs for location tracking, cargo load information, pre maintenance alerts and service history The status of the vehicles is tracked in real time The information is sent over the gateway to be monitored from remote location from a single source of truth',
    'image': '../../../../assets/wss.png'
    },
    {
        'class':'Default', 
        'icon':'fa-support', 
        'count':'', 
        'label':'Asset Insights', 
        'data':'Real time Vehicle Status - Location,performance and operational view',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'OBD solution to track vehicle health -Engine data, fuel data, battery status and Vehicle performance data Sensor tagged to vehicle IDs for location tracking, cargo load information, pre maintenance alerts and service history The status of the vehicles is tracked in real time The information is sent over the gateway to be monitored from remote location from a single source of truth',
    'image': '../../../../assets/wss.png'
    },
    {
        'class':'Default', 
        'icon':'fa-user', 
        'count':'', 
        'label':'User Manager', 
        'data':'Real time Vehicle Status - Location,performance and operational view',
        'link': 'http://13.232.68.106:82/login',
        'kpi': 'OBD solution to track vehicle health -Engine data, fuel data, battery status and Vehicle performance data Sensor tagged to vehicle IDs for location tracking, cargo load information, pre maintenance alerts and service history The status of the vehicles is tracked in real time The information is sent over the gateway to be monitored from remote location from a single source of truth',
    'image': '../../../../assets/wss.png'
    },
];
    constructor(   public dashboardconstant:DasboardConstant,private toastr: ToastrService,private CONSTANT: Constant, 
         private router: Router, private HTTPSERVICE: HttpService, private httpclient : HttpClient  ) {}

    ngOnInit() {
        this.getApp();
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    getApp()
    {
      const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.APPLICATION_API);
      this.getAPPSubscription = getSubscribe.subscribe(
          (data: any) => 
          {            
            this.fetchdata = data;
            console.log(this.fetchdata); 
          },
      );
    }    
}
