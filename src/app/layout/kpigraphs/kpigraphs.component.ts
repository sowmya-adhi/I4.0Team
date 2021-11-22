import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-kpigraphs',
  templateUrl: './kpigraphs.component.html',
  styleUrls: ['./kpigraphs.component.scss'],
  animations: [routerTransition()]
})
export class KpigraphsComponent implements OnInit {

  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute,
    private HTTPSERVICE: HttpService, private CONSTANT: Constant) { }

  asset_id = this.route.snapshot.queryParamMap.get('asset_id');
  assetMetadataArray: any = [];
  asset_name;
  asset_type_name;
  asset_type_id;
  livedata: any = [];
  sensors: any = [];
  sensorName: any = [];
  bomsdata: any = [];
  kpiList = [];

  lineDataArray = [];
  lineLabelsArray = [];
  lineChartDataAssign: Array<any> = [];        //chart data store
  lineChartLabelAssign: Array<any> = [];       //chart label store

  kpiLineChartArray = [];
  dateTime = new FormGroup({
    dt: new FormControl(),
    enddt: new FormControl()
  });

  duration: any = "5 Min";
  minDate: any;
  maxDate: any;
  param1;
  param2;
  //dummy:number=1;
  selectedYears: any[];
  years: any[];
  selectedKpi: any[] = [];

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  deselectAll(select: MatSelect) {
    this.selectedYears = [];
    select.value = [];
  }
  selectedKpiList() {
    this.loadLineChartDataForComp(this.duration)
  }

  ngOnInit(): void {
    this.getAssetMetadata();
    //window.location.reload();
  }

  onBack() {
    this.router.navigate(['/overview360']);
  }

  assignDuration(time) {
    if (this.duration == 'custom' && time != 'custom') {
      this.dateTime.reset('dt');
      this.dateTime.reset('enddt');
    }
    this.duration = time;
    this.loadLineChartData(this.duration);
    this.loadLineChartDataForComp(this.duration)
  }

  setMinimumDate() {
    this.minDate = new Date(this.dateTime.get('dt').value);
    var temp = new Date(this.minDate)
    temp.setMonth(temp.getMonth() + 3);
    this.maxDate = temp;
  }

  getAssetMetadata() {
    const getsubscribe = this.HTTPSERVICE.get(this.CONSTANT.ASSETMETADATA_API + `?asset_id=${this.asset_id}`);
    getsubscribe.subscribe(
      (data: any) => {
        this.assetMetadataArray = data[0].asset_Metadata;
        this.asset_name = data[0].asset_name;
        this.asset_type_name = data[0].asset_type_name;
        this.asset_type_id = data[0].asset_type_id;
        //this.getLiveData();
        this.getLastLiveData();
      },
      (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  getLiveData() {
    //last record of asset
    var stDate, endDate;
    stDate = new Date(new Date(Date.now() - 1000 * (60 * 10)).toUTCString()).toISOString()
    endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()

    stDate = stDate.replaceAll(":", "%3A");
    endDate = endDate.replaceAll(":", "%3A");
    this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + `?assetid=${this.asset_id}&startDateTime=${stDate}&endDateTime=${endDate}&limit=1`).subscribe(
      (data: any) => {
        console.log("data", data)
        this.getKPIList();
        this.livedata = data;
        this.sensors = data[0].sensors;
        //this.sensorName = Object.getOwnPropertyNames(data[0].sensors);
      }, (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  getLastLiveData() {

    this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + `?assetid=${this.asset_id}&limit=1`).subscribe(
      (data: any) => {
        this.sensorName = [];
        this.sensorName = Object.getOwnPropertyNames(data[0].sensors);
        this.getLiveData();
        // console.log('in lastlivedata', data[0].sensors);
        // this.getBomsList();
      }, (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
  getKPIList() {
    //to store tag and tagname in sepearte arrays
    if (this.asset_type_id > 0) {
      this.HTTPSERVICE.get(this.CONSTANT.GET_ATTRIBUTES_API + this.asset_type_id).subscribe(
        (data: any) => {
          //fetch attribute data
          this.bomsdata = data;
          for (let i = 0; i < this.bomsdata.length; i++) {
            if (this.sensorName.includes(this.bomsdata[i].data_point_reference)) {
              this.kpiList.push({ 'tag': this.bomsdata[i].data_point_reference, 'tag_name': this.bomsdata[i].attribute_name });
            }
          }
          this.selectedKpi.push({ 'tag': this.kpiList[0].tag, 'tag_name': this.kpiList[0].tag_name });
          this.loadLineChartDataForComp(this.duration);
          this.loadLineChartData(this.duration);

        }, (err: any) => {
          if (err.status == 403) {
            this.router.navigate(['/login']);
          }
        }
      );
    }
  }

  loadLineChartData(duration) {
    this.lineChartDataAssign = [];
    this.lineChartLabelAssign = [];
    this.kpiLineChartArray = [];

    var stDate, endDate;

    if (duration == '5 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 10)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '10 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 15)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '30 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 35)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == 'custom') {
      stDate = new Date(new Date(this.dateTime.get('dt').value).toUTCString()).toISOString()
      endDate = new Date(new Date(this.dateTime.get('enddt').value).toUTCString()).toISOString()
    }
    stDate = stDate.replaceAll(":", "%3A");
    endDate = endDate.replaceAll(":", "%3A");
    var str = `?assetid=${this.asset_id}&startDateTime=${stDate}&endDateTime=${endDate}&limit=1000`;
    this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + str).subscribe(
      (data: any) => {
        data.sort(
          (a, b) => (a.timestamp > b.timestamp) ? 1 : -1
        )
        this.lineLabelsArray = data.map(e => new Date(e.timestamp).toLocaleTimeString());
        this.lineChartLabelAssign = this.lineLabelsArray;
        for (let i = 0; i < this.kpiList.length; i++) {
          this.lineChartDataAssign = [];
          this.lineDataArray = data.map(e => e.sensors[this.kpiList[i].tag]); //find all records for input tag
          var label = this.kpiList.find(e => e.tag === this.kpiList[i].tag); //find label for input tag
          label = label.tag_name;

          this.lineChartDataAssign = [
            {
              data: this.lineDataArray, label: label, fill: false,
              pointRadius: 0, pointBackgroundColor: 'green', borderColor: 'blue'
            }];;

          this.kpiLineChartArray.push({
            "header": label,
            "lineChartDataAssign": this.lineChartDataAssign,
            "lineChartLabelAssign": this.lineChartLabelAssign
          });
        }
      }, (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          display: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
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

  public lineChartLegend: boolean;


  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  lineLabelsArrayComp = [];
  lineDataArrayComp = [];
  lineChartDataAssignComp: Array<any> = [];        //chart data store
  lineChartLabelAssignComp: Array<any> = [];       //chart label store

  loadLineChartDataForComp(duration) {
    this.lineChartDataAssignComp = [];
    this.lineChartLabelAssignComp = [];
    this.lineLabelsArrayComp = [];
    this.lineDataArrayComp = [];
    var stDate;
    var endDate;
    if (duration == '5 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 10)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '10 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 15)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == '30 Min') {
      stDate = new Date(new Date(Date.now() - 1000 * (60 * 35)).toUTCString()).toISOString()
      endDate = new Date(new Date(Date.now() - 1000 * (60 * 5)).toUTCString()).toISOString()
    }
    else if (duration == 'custom') {
      stDate = new Date(new Date(this.dateTime.get('dt').value).toUTCString()).toISOString()
      endDate = new Date(new Date(this.dateTime.get('enddt').value).toUTCString()).toISOString()
    }
    stDate = stDate.replaceAll(":", "%3A");
    endDate = endDate.replaceAll(":", "%3A");
    var str = '?assetid=' + this.asset_id.toString() + '&startDateTime=' + stDate + '&endDateTime=' + endDate + '&limit=1000'
    this.HTTPSERVICE.get(this.CONSTANT.TIME_SERIES_API + str).subscribe(
      (data: any) => {
        data.sort(
          (a, b) => (a.timestamp > b.timestamp) ? 1 : -1
        )
        for (let i = 0; i < this.selectedKpi.length; i++) {
          this.lineDataArrayComp = data.map(e => e.sensors[this.selectedKpi[i].tag])
          var label1 = this.kpiList.find(e => e.tag === this.selectedKpi[i].tag); //find label for inputtag
          label1 = label1.tag_name;
          var length = 6;
          var chars = '0123456789ABCDEF';
          var hex = '#';
          while (length--)
            hex += chars[(Math.random() * 16) | 0];
          this.lineChartDataAssignComp.push(
            {
              data: this.lineDataArrayComp, label: label1, fill: false,
              pointRadius: 0, borderColor: hex
            });
        }
        this.lineLabelsArrayComp = data.map(e => new Date(e.timestamp).toLocaleTimeString());
        this.lineChartLabelAssignComp = this.lineLabelsArrayComp;
      }, (err: any) => {
        if (err.status == 403) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
