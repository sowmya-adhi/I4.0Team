import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import { Constant } from '../../../config/constant';
import { HttpService } from '../../../config/http.service';
import { Color } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@angular/material/sort';
//import { textChangeRangeIsUnchanged } from 'typescript';
//import { clearInterval } from 'timers';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  animations: [routerTransition()]
})


export class AssetDetailsComponent implements OnInit {

  constructor(private translate: TranslateService, formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private CONSTANT: Constant, private HTTPSERVICE: HttpService) { }

  public nextLabel;
  public previousLabel;
  public chartValue: number[] = [];
  asset_id: string = this.route.snapshot.queryParamMap.get('asset_id');
  asset_name: any;
  asset_type: any;
  asset_type_id: any;
  autoRefresh: boolean = false;
  eventData: any[] = [];
  unfilteredEventData: any[] = [];
  public divnumber: number;
  errorBool: boolean = false;
  liveData: any[] = [];
  sensors: any[] = [];
  parameter: any;
  limit: any = 1;
  timer: any;
  sensorName = [];
  timestamp: any;
  arvrApi = this.CONSTANT.ARVR_API;

  ngOnInit(): void {
    this.divnumber = 1;
    this.getMaintenanceHistoryData()
    this.getNextManitenance()
    this.getLastManitenance()
    this.getAssetDetailsById()
  }
  onBack() {
    this.router.navigate(['/overview360']);
  }
  setDiv(st) {
    this.divnumber = st;
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  event_date = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  dateTime = new FormGroup({
    dt: new FormControl(),
    enddt: new FormControl()
  });
  assetEventStatus: string = 'all';
  all:any;
  open: any;
  inprogress: any;
  closed: any;
  setEvent(newStatus) {
    this.assetEventStatus = newStatus;
    if (newStatus == 'all') {
      this.sortedData = this.eventData;
      this.all=this.eventData.length;
    }
    else if (newStatus == 'open') {
      this.sortedData = this.eventData.filter(e => e.eventstatus == 'open')
      this.open = this.sortedData.length
    }
    else if (newStatus == 'in-progress') {
      this.sortedData = this.eventData.filter(e => e.eventstatus == 'in-progress')
      this.inprogress = this.sortedData.length
    }
    else if (newStatus == 'closed') {
      this.sortedData = this.eventData.filter(e => e.eventstatus == 'closed')
      this.closed = this.sortedData.length
    }
  }
  getLiveData(id: number) {
    var func;
    var stDate;
    var endDate;
    if (this.autoRefresh) {
      this.timer = setInterval(func = () => {
        this.limit = 1;
        this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + '?assetid=' + this.asset_id.toString() + '&limit=' + this.limit).subscribe(
          (data: any) => {
            //console.log("live", data)
            this.liveData = data;
            this.timestamp = this.liveData[0].timestamp;
            this.sensorName = [];
            this.sensors = this.liveData[0].sensors;
            this.sensorName = Object.getOwnPropertyNames(this.sensors)
            this.getKPIList(id);
            //this.getThresholdDetails(id);
          },
          (err: any) => {
            if (err.status == 403) {
              this.router.navigate(['/login']);
            }
            else if (err.status >= 0) {
              this.errorBool = true;
            }
          }
        );
      }, 5000);
    }
    else {
      clearInterval(this.timer)
      this.limit = 1;
      this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + '?assetid=' + this.asset_id.toString() + '&limit=' + this.limit).subscribe(
        (data: any) => {
          this.liveData = data;
          this.timestamp = this.liveData[0].timestamp;
          this.sensorName = [];
          this.sensors = this.liveData[0].sensors;
          this.sensorName = Object.getOwnPropertyNames(this.sensors)
          this.getKPIList(id);
          //this.getThresholdDetails(id)
        },
        (err: any) => {
          if (err.status == 403) {
            this.router.navigate(['/login']);
          }
          else if (err.status >= 0) {
            this.errorBool = true;
          }
        }
      );
    }
  }
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
        },
        gridLines: {
          display: true
        }
      }],
      xAxes: [{
        gridLines: {
          drawOnChartArea: true
        }
      }]
    },
    labels: {
      fontFamily: 'Lato',
      fontWeight: 'bold',
      fontSize: 12,
      Color: '#ACACAC',
      lineHeight: 12,
    },
    hover: {
      mode: 'index'
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#006FBA',
    }
  ];
  public lineChartLegend: boolean;
  public lineChartDataAssign = [];
  public lineChartLabelAssign = [];
  chartData: any[] = [];
  dummyArray: any[] = [];
  duration: any = "5min";
  minDate: any;
  maxDate: any;
  setMinimumDate() {
    this.minDate = new Date(this.dateTime.get('dt').value);
    var temp = new Date(this.minDate)
    temp.setHours(temp.getHours() + 1);
    this.maxDate = temp;
  }
  assignDuration(duration) {
    this.duration = duration;
    this.getDataForLineChart(this.parameter, duration)
  }
  labelName: any;
  getDataForLineChart(param, duration) {
    this.lineChartDataAssign = [];
    this.lineChartLabelAssign = [];
    this.parameter = param;
    this.limit = 1000;
    var str;
    var stDate;
    var endDate;
    if (duration == '5min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 10)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '10min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 15)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '30min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 35)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == 'custom') {
      stDate = new Date(new Date(this.dateTime.get('dt').value).toUTCString()).toISOString()
      endDate = new Date(new Date(this.dateTime.get('enddt').value).toUTCString()).toISOString()
    }
    stDate = stDate.replaceAll(":", "%3A");
    endDate = endDate.replaceAll(":", "%3A");
    //console.log("dates", stDate, endDate)
    str = '?assetid=' + this.asset_id.toString() + '&startDateTime=' + stDate + '&endDateTime=' + endDate + '&limit=' + this.limit
    this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + str).subscribe(
      (data: any) => {
        this.chartData = data
        if (param == 'all') {
          this.labelName = param;
          var temp = this.chartData.map(e => e.timestamp)
          var timestamp = this.chartData.map(e => new Date(e.timestamp).toLocaleTimeString())
          this.lineChartLabelAssign = timestamp;
          for (let i = 0; i < this.sensorName.length; i++) {
            var label;
            this.chartValue = this.chartData.map(e => e.sensors[this.sensorName[i]])
            for (let j = 0; j < this.kpiList.length; j++) {
              if (this.kpiList[j].tag == this.sensorName[i]) {
                label = this.kpiList[j].tag_name;
              }
            }
            var length = 6;
            var chars = '0123456789ABCDEF';
            var hex = '#';
            while (length--)
              hex += chars[(Math.random() * 16) | 0];
            this.lineChartDataAssign.push({
              data: this.chartValue, label: label, fill: false, borderColor: hex
            });
          }
        }
        else {
          this.chartValue = this.chartData.map(e => e.sensors[param])
          for (let j = 0; j < this.kpiList.length; j++) {
            if (this.kpiList[j].tag == param) {
              label = this.kpiList[j].tag_name;
            }
          }
          this.labelName = label;
          var temp = this.chartData.map(e => e.timestamp)
          var timestamp = this.chartData.map(e => new Date(e.timestamp).toLocaleTimeString())
          this.lineChartLabelAssign = timestamp;
          this.lineChartDataAssign = [{
            data: this.chartValue, label: label, fill: false,
            pointRadius: 5, pointBackgroundColor: 'green', borderColor: 'blue'
          }]
        }
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );

  }
  maintenanceHistortArray: any[] = [];
  unfilteredMaintenanceArray: any[] = [];
  dateArray: any[] = []
  getMaintenanceHistoryData() {
    let array = [];
    array.push({ "asset_id": this.asset_id, "service_code": 'MRO-MH' })
    this.HTTPSERVICE.post(this.CONSTANT.MAINTENANCE_API, JSON.stringify(array[0])).subscribe(
      (data: any) => {
        this.maintenanceHistortArray = data;
        this.unfilteredMaintenanceArray = data;
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  specArray: any[] = [];
  getTechnicalSpec(asset_type_id: number) {
    let array = [];
    if (asset_type_id == 1) {
      //hardcoded asset type id bcoz for asset type 1 --> they used 50000001
      array.push({ "asset_type_id": 50000001, "service_code": 'MRO-TS' })
    }
    else {
      array.push({ "asset_type_id": asset_type_id, "service_code": 'MRO-TS' })
    }
    //console.log("array",array)
    this.HTTPSERVICE.post(this.CONSTANT.MAINTENANCE_API, JSON.stringify(array[0])).subscribe(
      (data: any) => {
        this.specArray = data;
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  setMaintenanceStartDate() {
    //console.log(new Date(this.range.get('start').value))
  }
  datesUpdated() {
    this.maintenanceHistortArray = this.unfilteredMaintenanceArray;
    if (this.range.get('start').value && this.range.get('end').value) {
      this.range.get('end').value.setMinutes(59);
      this.range.get('end').value.setHours(23);
      this.maintenanceHistortArray = this.unfilteredMaintenanceArray.filter(e => new Date(parseInt(e.maintenance_date)).toISOString() >= new Date(new Date(this.range.get('start').value).toUTCString()).toISOString())
      this.maintenanceHistortArray = this.maintenanceHistortArray.filter(e => new Date(parseInt(e.maintenance_date)).toISOString() <= new Date(new Date(this.range.get('end').value).toUTCString()).toISOString())
    }

  }
  sortedData: any = [];
  eventDatesUpdated() {
    this.eventData = this.unfilteredEventData;
    if (this.event_date.get('start').value && this.event_date.get('end').value) {
      this.event_date.get('end').value.setMinutes(59);
      this.event_date.get('end').value.setHours(23);
      this.eventData = this.unfilteredEventData.filter(e => new Date(e.timestamp).toISOString() >= new Date(new Date(this.event_date.get('start').value).toUTCString()).toISOString())
      this.eventData = this.eventData.filter(e => new Date(e.timestamp).toISOString() <= new Date(new Date(this.event_date.get('end').value).toUTCString()).toISOString())
      this.sortedData = this.eventData
      this.all=this.eventData.length;
      var temp = this.eventData.filter(e => e.eventstatus == 'open');
      this.open = temp.length;
      var temp = this.eventData.filter(e => e.eventstatus == 'in-progress');
      this.inprogress = temp.length;
      var temp = this.eventData.filter(e => e.eventstatus == 'closed');
      this.closed = temp.length;
    }
  }
  removeFilter() {
    this.range.reset();
    this.getMaintenanceHistoryData();
  }
  removeEventFilter() {
    this.event_date.reset();
    this.getEventData();
  }
  getAssetDetailsById() {
    this.HTTPSERVICE.get(this.CONSTANT.ASSETMETADATA_API + '?asset_id=' + this.asset_id).subscribe(
      (data: any) => {
        this.asset_name = data[0].asset_name;
        this.asset_type = data[0].asset_type_name;
        this.asset_type_id = data[0].asset_type_id;
        this.getLiveData(data[0].asset_type_id);
        this.getEventData();
        this.getTechnicalSpec(data[0].asset_type_id);
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  lastMaintenanceRecord: any[] = [];
  nextMaintenanceRecord: any[] = [];
  firstDate: Date;
  secDate: Date;
  lastMaintenanceAt: any;
  nextMaintenanceIn: any;
  getLastManitenance() {
    let array = [];
    array.push({ "asset_id": this.asset_id, "service_code": 'MRO-LMR', "record": "last" })
    this.HTTPSERVICE.post(this.CONSTANT.MAINTENANCE_API, JSON.stringify(array[0])).subscribe(
      (data: any) => {
        //console.log("last maintenance",data)
        this.lastMaintenanceRecord = data;
        this.lastMaintenanceRecord[0].maintenance_date = new Date(parseInt(this.lastMaintenanceRecord[0].maintenance_date)).toLocaleString()
        const StartDate = new Date(this.lastMaintenanceRecord[0].maintenance_date);
        const EndDate = new Date();
        this.lastMaintenanceAt = (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
          Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  getNextManitenance() {
    let array = [];
    array.push({ "asset_id": this.asset_id, "service_code": 'MRO-NMS', "record": "next" })
    this.HTTPSERVICE.post(this.CONSTANT.MAINTENANCE_API, JSON.stringify(array[0])).subscribe(
      (data: any) => {
        //console.log("next maintenance",data)
        this.nextMaintenanceRecord = data;
        this.nextMaintenanceRecord[0].maintenance_date = new Date(parseInt(this.nextMaintenanceRecord[0].maintenance_date)).toLocaleString();
        const StartDate = new Date();
        const EndDate = new Date(this.nextMaintenanceRecord[0].maintenance_date);
        this.nextMaintenanceIn = (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
          Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  getEventData() {
    this.HTTPSERVICE.get(this.CONSTANT.GET_LAST10_EVENTS + "?event_type=push&limit=200").subscribe(
      (data: any) => {
        if (data.length > 0) {
          data = data.filter(e => e.assetid == this.asset_id)
          this.unfilteredEventData = data;
          this.eventData = this.unfilteredEventData;
          this.sortedData = this.eventData;
          this.all=this.eventData.length;
          var temp = this.eventData.filter(e => e.eventstatus == 'open');
          this.open = temp.length;
          var temp = this.eventData.filter(e => e.eventstatus == 'in-progress');
          this.inprogress = temp.length;
          var temp = this.eventData.filter(e => e.eventstatus == 'closed');
          this.closed = temp.length;
          this.eventData = this.unfilteredEventData;
          this.sortedData = this.eventData;
          //console.log("event data",this.open,this.inprogress,this.closed)
        }
      }
    );
  }
  sortData(sort: Sort) {
    const data = this.eventData.slice();
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
        default: return 0;
      }
    });
  }
  cancelChart() {
    this.duration = '5min';
    this.dateTime.setValue({ 'dt': "", 'enddt': "" })
    this.minDate = ""
    this.maxDate = ""
  }
  dummy: any[] = [];
  dummyList: any[] = [];
  kpiList: any[] = [];
  getKPIList(id: number) {
    var asset_type_id;
    this.HTTPSERVICE.get(this.CONSTANT.ASSET_TYPES_API + '?asset_type_name=' + this.asset_type).subscribe(
      (data: any) => {
        asset_type_id = data[0].asset_type_id;
        if (asset_type_id > 0) {
          this.HTTPSERVICE.get(this.CONSTANT.GET_ATTRIBUTES_API + asset_type_id).subscribe(
            (dataa:any)=>{
              console.log("sensorname", this.sensorName)
              this.getThresholdDetails(id);
              this.dummy = dataa;
              for (let i = 0; i < this.dummy.length; i++) {
                if (this.sensorName.includes(this.dummy[i].data_point_reference)) {
                  this.kpiList.push({ 'tag': this.dummy[i].data_point_reference, 'tag_name': this.dummy[i].attribute_name })
                }
              }
              //console.log("kpiLIST", this.kpiList)
            },
            (err: any) => {
              if (err.status == 403) {
                this.router.navigate(['/login']);
              }
              else if (err.status >= 0) {
                this.errorBool = true;
              }
            }
          );
          // this.HTTPSERVICE.get(this.CONSTANT.TWIN_SERVICE_API + '?asset_type_id=' + asset_type_id + '&bom_type=IIOT').subscribe(
          //   (data: any) => {
          //     this.getThresholdDetails(id);
          //     this.dummy = data;
          //     for (let i = 0; i < this.dummy.length; i++) {
          //       if (!this.dummy[i].is_root && this.sensorName.includes(this.dummy[i].tag)) {
          //         this.kpiList.push({ 'tag': this.dummy[i].tag, 'tag_name': this.dummy[i].item_name })
          //       }
          //     }
          //   },
          //   (err: any) => {
          //     if (err.status == 403) {
          //       this.router.navigate(['/login']);
          //     }
          //     else if (err.status >= 0) {
          //       this.errorBool = true;
          //     }
          //   }
          // );
        }
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if (err.status >= 0) {
          this.errorBool = true;
        }
      }
    );
  }
  closeAlert() {
    this.errorBool = false;
  }
  colorArray: any[] = [];
  thresholdArray: any[] = [];
  getThresholdDetails(asset_type_id: number) {
    this.colorArray = [];
    this.HTTPSERVICE.get(this.CONSTANT.THRESHOLD_API + "?asset_type_id=" + asset_type_id).subscribe(
      (data: any) => {
        this.thresholdArray = data;
        for (let j = 0; j < this.thresholdArray.length; j++) {
          if (this.sensorName.includes(this.thresholdArray[j].tag_name)) {
            let temp = this.sensors[this.thresholdArray[j].tag_name]
            let minimum_value = this.thresholdArray[j].minimum_value
            let maximum_value = this.thresholdArray[j].maximum_value
            let warning_min = this.thresholdArray[j].warning_minimum
            let warning_max = this.thresholdArray[j].warning_maximum
            if (this.thresholdArray[j].tag_name == "CHW_Flow_lps" || this.thresholdArray[j].tag_name == "Q_c" ||
              this.thresholdArray[j].tag_name == "Q_e" || this.thresholdArray[j].tag_name == "Condenser_inlet_fl1_m_flow") {
              this.colorArray.push({
                "tag": this.thresholdArray[j].tag_name, "color": "#343434", "unit": this.thresholdArray[j].unit,
                "value": temp, "tag_name": this.thresholdArray[j].display_name
              })
            }
            else if (temp < minimum_value || temp >= maximum_value) //red
            {
              if (temp < minimum_value) {
                this.colorArray.push({
                  "tag": this.thresholdArray[j].tag_name, "color": "#D2222D", "unit": this.thresholdArray[j].unit,
                  "value": temp, "tag_name": this.thresholdArray[j].display_name, "arrow": "down", "lessOrMoreVal": ((temp - minimum_value) / minimum_value) * 100
                })
              } else if (temp >= maximum_value) {
                this.colorArray.push({
                  "tag": this.thresholdArray[j].tag_name, "color": "#D2222D", "unit": this.thresholdArray[j].unit,
                  "value": temp, "tag_name": this.thresholdArray[j].display_name, "arrow": "up", "lessOrMoreVal": ((temp - maximum_value) / maximum_value) * 100
                })
              }
            }
            else if (temp >= minimum_value && temp < warning_min)//amber
            {
              this.colorArray.push({
                "tag": this.thresholdArray[j].tag_name, "color": "#FFBF00", "unit": this.thresholdArray[j].unit,
                "value": temp, "tag_name": this.thresholdArray[j].display_name, "arrow": 'down', "lessOrMoreVal": ((temp - warning_min) / warning_min) * 100
              })
            }
            else if (temp > warning_max && temp <= maximum_value)//amber
            {
              this.colorArray.push({
                "tag": this.thresholdArray[j].tag_name, "color": "#FFBF00", "unit": this.thresholdArray[j].unit,
                "value": temp, "tag_name": this.thresholdArray[j].display_name, "arrow": 'up', "lessOrMoreVal": ((temp - warning_max) / warning_max) * 100
              })
            }
            else if (temp >= warning_min && temp <= warning_max)//green
            {
              this.colorArray.push({
                "tag": this.thresholdArray[j].tag_name, "color": "#238823", "unit": this.thresholdArray[j].unit,
                "value": temp, "tag_name": this.thresholdArray[j].display_name
              })
            }

          }

        }
        //console.log("color array", this.colorArray)
      }
    );
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
