import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Sort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-alertdashboard',
  templateUrl: './alertdashboard.component.html',
  styleUrls: ['./alertdashboard.component.scss'],
  animations: [routerTransition()]
})
export class AlertdashboardComponent implements OnInit {

  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute,
    private HTTPSERVICE: HttpService, private CONSTANT: Constant, private spinner: NgxSpinnerService) { } //private spinner: NgxSpinnerService
  userInfo: any = [];
  availableScope: any[] = [];
  editBool: boolean = true;
  severity: any;
  assettype: any;
  asset: any;
  sensorname: any;
  p:any;
  ngOnInit(): void {
   this.spinner.show();
    if (localStorage.getItem('userdetails') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('userdetails'));
      this.availableScope = this.userInfo.scope;
      if (this.availableScope.includes('EVENTSERVICE.ALL') || this.availableScope.includes('EVENTSERVICE.UPDATE')) {
        this.editBool = false;
      }
    }
    //set conditions to all
    this.severity = 'all';
    this.assettype = 'all';
    this.asset = 'all';
    this.sensorname = 'all';
    // start and end of today
    var startOfDayString;
    var endOfDayString;
    var startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDayString = new Date(new Date(startOfDay).toUTCString()).toISOString();
    var endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDayString = new Date(new Date(endOfDay).toUTCString()).toISOString(); 
    //endOfDayString = new Date(endOfDay).toISOString();
    this.getAllAssetTypes(startOfDayString, endOfDayString);
    //this.getTodayEvents(startOfDayString, endOfDayString);
  }
  dateTime = new FormGroup({
    dt: new FormControl(),
    enddt: new FormControl()
  });
  assetBoolean: boolean = false;
  minDate: any;
  maxDate: any;
  searchText: any;

  AssetTypesArray: any[] = [];
  SensorsArray: any[] = [];
  SensorNamesArray: any[] = [];
  AssetArray: any[];
  EventsArray: any[];
  AssetTypesCount: any = [];
  BarChartDataArray: any[] = [];
  sortedData: any[] = [];
  BackupEventsArray: any[] = [];

  public pieChartOptions:any = 
    {
      legend : {position : 'bottom'}
  }
  public pieChartColors1: any = [
    {
      backgroundColor: ['#59AA74', '#eba834', '#f57564'], //'#ff99cc', '#99ccff', '#ffe699'
      fontColor: [
        '#343434'
      ],
      borderWidth: 0,
      indexLabelFontColor: ['white']
    }
  ];
  public pieChartColors: any = [
    {
      backgroundColor: [],
      fontColor: [
        '#343434'
      ],
      borderWidth: 0,
      indexLabelFontColor: ['white']
    }


  ];
  pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  pieChartLabels1: any[] = [];
  public pieChartData1: any[] = [];
  public pieChartType: string = 'pie';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend : {position : 'bottom'},
    //scales : {yAxes : [{ticks : {display : true,max : 100,min : 0,stepSize : 20}}]}
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];


  severityCount: any = [
    { severity: 'low', count: 0 },
    { severity: 'high', count: 0 },
    { severity: 'critical', count: 0 }];

  AssetIdsArray: any[] = [];


  setMinimumDate() {
    this.minDate = new Date(this.dateTime.get('dt').value);
    var temp = new Date(this.minDate)
    temp.setMonth(temp.getMonth() + 3);
    this.maxDate = temp;
  }
  assignDuration() {
    var startDate = new Date(this.dateTime.get('dt').value);
    var endDate = new Date(this.dateTime.get('enddt').value);
    var startOfDayString;
    var endOfDayString;
    startOfDayString = new Date(new Date(startDate).toUTCString()).toISOString();
    endOfDayString = new Date(new Date(endDate).toUTCString()).toISOString();
    this.getTodayEvents(startOfDayString, endOfDayString);


  }
  getAllAssetTypes(startOfDayString, endOfDayString) {
    this.AssetTypesArray = [];
    this.HTTPSERVICE.get(this.CONSTANT.GET_ASSET_TYPES).subscribe(
      (data: any) => {
        this.AssetTypesArray = data;
        this.getTodayEvents(startOfDayString, endOfDayString);
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  onChangeAssetType(asset_type_id: string) {
    this.asset = 'all';
    this.sensorname = 'all';
    this.getSensorsByAssetType(asset_type_id)
    //console.log("asset details", this.assettype, this.asset, this.sensorname)
    if (asset_type_id == 'all') {
      this.assetBoolean = false;
      this.asset = 'all';
      this.sensorname = 'all';
      if (this.severity == 'all') {
        this.EventsArray = this.BackupEventsArray;
        //console.log("in assettype", this.EventsArray)
      }
      if (this.severity != 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == this.severity);
        //console.log("in assettype", this.EventsArray)
      }
    }
    if (asset_type_id != 'all') {
      this.assetBoolean = true;
      this.AssetArray = [];
      this.HTTPSERVICE.get(this.CONSTANT.GET_ASSET_TYPES + "?asset_type_id=" + asset_type_id).subscribe(
        (data: any) => {
          this.getAssetsByAssetType(data[0].asset_type_name)
        },
        (err: any) => {
          if (err.status == 403) {
            this.router.navigate(['/login']);
          }
        }
      );
      if (this.severity != 'all') {
        if (this.asset == 'all' && this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.severity == this.severity);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset == 'all' && this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.severity == this.severity && e.sensorname == this.sensorname);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset > 0 && this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.severity == this.severity && e.assetid == this.asset);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset > 0 && this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.severity == this.severity && e.assetid == this.asset && e.sensorname == this.sensorname);
          //console.log("in assettype", this.EventsArray)
        }
      }
      if (this.severity == 'all') {
        if (this.asset == 'all' && this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset == 'all' && this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.sensorname == this.sensorname);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset > 0 && this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.assetid == this.asset);
          //console.log("in assettype", this.EventsArray)
        }
        if (this.asset > 0 && this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == asset_type_id && e.assetid == this.asset && e.sensorname == this.sensorname);
          //console.log("in assettype", this.EventsArray)
        }
      }
    }
    this.getSensorsByAssetType(asset_type_id)
    this.sortedData = this.EventsArray
    this.drawPieChart1(this.EventsArray);
    this.drawPieChart2(this.EventsArray);
    this.drawBarChart(this.EventsArray);

  }
  onChangeAsset(asset: any) {
    //console.log("asset details", this.assettype, this.asset, this.sensorname)
    if (asset == 'all') {
      if (this.severity == 'all' && this.assettype != 'all') {
        if (this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype);
          //console.log("in asset", this.EventsArray);
        }
        if (this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.sensorname == this.sensorname);
          //console.log("in asset", this.EventsArray);
        }
      }
      else if (this.severity != 'all' && this.assettype != 'all') {
        if (this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity);
          //console.log("in asset", this.EventsArray);
        }
        if (this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.sensorname == this.sensorname && e.severity == this.severity);
          //console.log("in asset", this.EventsArray);
        }
      }
    }
    if (asset > 0) {
      if (this.severity == 'all' && this.assettype != 'all') {
        if (this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.assetid == asset);
          //console.log("in asset", this.EventsArray);
        }
        if (this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.sensorname == this.sensorname && e.assetid == asset);
          //console.log("in asset", this.EventsArray);
        }
      }
      else if (this.severity != 'all' && this.assettype != 'all') {
        if (this.sensorname == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity && e.assetid == asset);
          //console.log("in asset", this.EventsArray);
        }
        if (this.sensorname != 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.sensorname == this.sensorname && e.severity == this.severity && e.assetid == asset);
          //console.log("in asset", this.EventsArray);
        }
      }
    }
    this.getSensorsByAssetType(this.assettype);
    this.sortedData = this.EventsArray;
    this.drawPieChart1(this.EventsArray);
    this.drawPieChart2(this.EventsArray);
    this.drawBarChart(this.EventsArray);
  }
  onChangeSensors(sensorname: any) {
    if (sensorname == 'all') {
      if (this.severity == 'all' && this.assettype != 'all') {
        if (this.asset == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype)
        }
        if (this.asset > 0) {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.assetid == this.asset)
        }
      }
      if (this.severity != 'all' && this.assettype != 'all') {
        if (this.asset == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity)
        }
        if (this.asset > 0) {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity && e.assetid == this.asset)
        }
      }
    }
    if (sensorname != 'all') {
      if (this.severity == 'all' && this.assettype != 'all') {
        if (this.asset == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.sensorname == sensorname)
        }
        if (this.asset > 0) {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.assetid == this.asset && e.sensorname == sensorname)
        }

      }
      else if (this.severity != 'all' && this.assettype != 'all') {
        if (this.asset == 'all') {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity && e.sensorname == sensorname)
        }
        if (this.asset > 0) {
          this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.severity == this.severity && e.assetid == this.asset && e.sensorname == sensorname)
        }
      }
    }
    this.getSensorsByAssetType(this.assettype);
    this.sortedData = this.EventsArray;
    this.drawPieChart1(this.EventsArray);
    this.drawPieChart2(this.EventsArray);
    this.drawBarChart(this.EventsArray);
  }
  onChangeSeverity(severity: any) {
    console.log("asset details", this.assettype, this.asset, this.sensorname)
    if (severity != 'all') {
      //console.log("severity all")
      if (this.assettype == 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == severity);
        //console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset == 'all' && this.sensorname == 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == severity && e.assettype == this.assettype);
        //console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset == 'all' && this.sensorname != 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == severity && e.assettype == this.assettype && e.sensorname == this.sensorname);
        //console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset > 0 && this.sensorname == 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == severity && e.assettype == this.assettype && e.assetid == this.asset);
        //console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset > 0 && this.sensorname != 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.severity == severity && e.assettype == this.assettype && e.assetid == this.asset && e.sensorname == this.sensorname);
        //console.log("in seveirty", this.EventsArray)
      }
    }
    if (severity == 'all') {
      if (this.assettype == 'all') {
        this.EventsArray = this.BackupEventsArray;
        console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset == 'all' && this.sensorname == 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype);
        console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset > 0 && this.sensorname == 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.assetid == this.asset);
        console.log("in seveirty", this.EventsArray)
      }
      else if (this.assettype != 'all' && this.asset > 0 && this.sensorname != 'all') {
        this.EventsArray = this.BackupEventsArray.filter(e => e.assettype == this.assettype && e.assetid == this.asset && e.sensorname == this.sensorname);
        console.log("in seveirty", this.EventsArray)
      }
    }
    this.getSensorsByAssetType(this.assettype);
    this.sortedData = this.EventsArray;
    this.drawPieChart1(this.EventsArray);
    this.drawPieChart2(this.EventsArray);
    this.drawBarChart(this.EventsArray);

  }
  getSensorsByAssetType(asset_type_id) {
    this.SensorsArray = this.EventsArray.filter(e => e.assettype == asset_type_id)
    this.SensorNamesArray = this.SensorsArray.map(e => e.sensorname)
    //console.log("sensorname", this.SensorNamesArray)
    this.SensorNamesArray = [...new Set(this.SensorNamesArray)]
    //this.SensorNamesArray = this.SensorNamesArray.filter((x, i, a) => a.indexOf(x) == i)
    //console.log("sensorsarray", this.SensorNamesArray)

  }
  getAssetsByAssetType(asset_type_name) {
    this.HTTPSERVICE.get(this.CONSTANT.GET_ASSET_BY_TYPE + asset_type_name).subscribe(
      (data: any) => {
        this.AssetArray = data;
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  getTodayEvents(startOfDayString, endOfDayString) {
    this.spinner.show()
    //console.log(startOfDayString, endOfDayString)
    this.assettype = 'all';
    this.asset = 'all';
    this.sensorname = 'all';
    this.severity = 'all';
    this.assetBoolean = false;
    this.EventsArray = [];
    startOfDayString = startOfDayString.replaceAll(":", "%3A");
    endOfDayString = endOfDayString.replaceAll(":", "%3A");
    this.HTTPSERVICE.get(this.CONSTANT.GET_LAST10_EVENTS + "?event_type=push&startDateTime=" + startOfDayString + "&endDateTime=" + endOfDayString).subscribe(
      (data: any) => {
        this.EventsArray = data;
        this.sortedData = this.EventsArray;
        this.BackupEventsArray = this.EventsArray;
        console.log("events", this.EventsArray)
        this.drawPieChart1(this.EventsArray);
        this.drawPieChart2(this.EventsArray);
        this.drawBarChart(this.EventsArray);
        this.spinner.hide();
      },
      (err: any) => {
        if (err.status == 403) {
          this.spinner.hide();
          this.router.navigate(['/login']);
        }
      }
    );
  }
  drawPieChart1(EventsArray) {
    this.AssetTypesCount = [];
    this.pieChartLabels = [];
    this.pieChartData = [];
    //console.log("chart 1",EventsArray)
    EventsArray.map((e) => {
      if (this.AssetTypesCount[parseInt(e.assettype)] == undefined) {
        this.AssetTypesCount[parseInt(e.assettype)] = 0
        var assettypename = this.AssetTypesArray.filter(k => k.asset_type_id == parseInt(e.assettype));
        //console.log("asset name", assettypename)
        this.pieChartLabels.push(assettypename[0].asset_type_name)
        // this.HTTPSERVICE.get(this.CONSTANT.GET_ASSET_TYPES + "?asset_type_id=" + parseInt(e.assettype)).subscribe(
        //   (data: any) => {
        //     this.pieChartLabels.push(data[0].asset_type_name)
        //   }
        // );
      }
      this.AssetTypesCount[parseInt(e.assettype)]++;
    })
    this.pieChartData = this.AssetTypesCount.filter(e => parseInt(e) > 0)
    for (let i = 0; i < this.pieChartData.length; i++) {
      var chars = '0123456789ABCDEF';
      var hex = '#';
      var length = 6;
      while (length--) {
        hex += chars[(Math.random() * 16) | 0];
      }
      this.pieChartColors[0].backgroundColor[i] = hex;
    }
    //console.log("labels",this.pieChartLabels)
  }
  drawPieChart2(EventsArray) {
    this.pieChartLabels1 = [];
    this.pieChartData1 = [];
    this.severityCount = [
      { severity: 'low', count: 0 },
      { severity: 'high', count: 0 },
      { severity: 'critical', count: 0 }];
    EventsArray.map((e, i) => {
      this.severityCount.map(k => {
        if (k.severity == e.severity) {
          k.count++
        }
      })
    })
    //console.log(this.severityCount);
    this.pieChartLabels1 = this.severityCount.map(e => e.severity);
    this.pieChartData1 = this.severityCount.map(e => e.count);
    //console.log("chart 2 data", this.pieChartLabels1, this.pieChartData1)

  }
  drawBarChart(EventsArray) {
    this.barChartLabels = [];
    this.barChartData = [];
    this.BarChartDataArray = [];
    var dummyEventArray = EventsArray;
    EventsArray = [... new Set(EventsArray.map(e => e.assetid))]
    EventsArray.map((e, i) => {
      var Obj = Object.create({ assetid: '', low: 0, high: 0, critical: 0 })
      Obj.assetid = e
      Obj.low = 0
      Obj.high = 0
      Obj.critical = 0
      if (!this.BarChartDataArray.filter(s => s.assetid).includes(e.assetid)) {
        this.BarChartDataArray.push(Obj);
      }
    })
    dummyEventArray.forEach(element => {
      let i = 0;
      i = this.BarChartDataArray.findIndex((k) => (k.assetid == element.assetid))
      if (element.severity == 'low') {
        this.BarChartDataArray[i].low++;
      }
      if (element.severity == 'high') {
        this.BarChartDataArray[i].high++;
      }
      if (element.severity == 'critical') {
        this.BarChartDataArray[i].critical++;
      }

    });
    var id = [];
    var low = [];
    var high = [];
    var critical = [];
    for (let i = 0; i < this.BarChartDataArray.length; i++) {
      id[i] = this.BarChartDataArray[i].assetid;
      low[i] = this.BarChartDataArray[i].low;
      high[i] = this.BarChartDataArray[i].high;
      critical[i] = this.BarChartDataArray[i].critical;
    }
    //console.log("bd",this.BarChartDataArray);
    //console.log("low,high,critical",low,high,critical)
    this.barChartLabels = id;
    this.barChartData = [
      { data: low, label: 'Low', stack: 'a', backgroundColor : '#59AA74' },
      { data: high, label: 'High', stack: 'a',backgroundColor : '#eba834'  },
      { data: critical, label: 'Critical', stack: 'a',backgroundColor : '#f57564'  }
    ];
  }
  sortData(sort: Sort) {
    const data = this.EventsArray.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp': return compare(a.timestamp, b.timestamp, isAsc);
        case 'assetid': return compare(a.assetid, b.assetid, isAsc);
        case 'sensorname': return compare(a.sensorname, b.sensorname, isAsc);
        case 'severity': return compare(a.severity, b.severity, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
  removeFilter() {
    this.dateTime.reset();
    this.ngOnInit();
  }
  //update dt_alert_new to close
  @ViewChild('update') update: NgForm;
  updateAlert(form: NgForm) {
    var timestamp = parseInt(form.value.timestamp)
    //console.log("form.value", form.value)
    var array = [];
    array.push(
      {
        "comments": form.value.comments,
        "eventstatus": form.value.eventstatus
      },
    )
    //console.log("array[0]", array[0])
    this.HTTPSERVICE.put(this.CONSTANT.UPDATE_ALERT_STATUS + "?event_type=push&timestamp=" + timestamp, array[0]).subscribe(
      (data: any) => {
        //console.log("data", data);
        this.dateTime.reset();
        this.ngOnInit();
      }
    );
  }
  resetForm() {
    this.dateTime.reset();
    this.ngOnInit()
  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }
  public chartHovered(e: any): void {
    // console.log(e);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
