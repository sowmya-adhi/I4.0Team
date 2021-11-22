import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-overview360',
  templateUrl: './overview360.component.html',
  styleUrls: ['./overview360.component.scss'],
  animations: [routerTransition()]
})
export class Overview360Component implements OnInit {

  public nextLabel;
  public previousLabel;
  isChecked = true;
  formGroup: FormGroup;
  searchText: any;

  allAssetData: any[] = [];
  assetType: any[] = [];
  count: number;
  fetchData: any[] = [];
  chartBool: boolean = false;
  assetLength: any;

  errorBool: boolean = false;


  constructor(private translate: TranslateService, formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private CONSTANT: Constant, private HTTPSERVICE: HttpService) {
    this.formGroup = formBuilder.group({
      enableWifi: '',
      acceptTerms: ['', Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.getAllAssets();
    this.allAssetBool = true;

  }

  public show: boolean = false;
  public shapeData: object;
  public dataSource: object;
  public shapeSettings: object;
  toggle() {
    this.show = !this.show;
  }

  //doughnut chart
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet[];
  public doughnutChartOptions: any = {}
  public doughnutChartColors: any = [
    {
      backgroundColor: [],
      fontColor: [
        '#343434'
      ],
      borderWidth: 0,
      indexLabelFontColor: ['white']
    }


  ];

  donutFunction() {
    this.doughnutChartOptions = {
      cutoutPercentage: 80,
      legend: {
        display: false
      },
      centerText: {
        text: this.assetLength.toString()
      }
    }
    var chartData = this.assetType.map(e => e.count)
    var Label = this.assetType.map(e => e.type)
    var chartColor = this.assetType.map(e => e.color)
    this.doughnutChartData = chartData;
    this.doughnutChartColors[0].backgroundColor = chartColor;
    this.doughnutChartLabels = Label;
    this.chartBool = true;
  }

  public doughnutChartPlugins: any[];
  
  chartFunction() {
    this.doughnutChartPlugins = [{
      beforeDraw(chart) {
        const ctx = chart.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = "46px Lato";
        ctx.fillStyle = '#343434';
        var text = chart.config.options.centerText.text;
        ctx.fillText(text, centerX, centerY);
        ctx.font = "15px Lato";
        ctx.fillStyle = '#343434';
        ctx.fillText('Total Assets', centerX, centerY + 30);
      }
    }];
  }

  getAllAssets() {
    this.HTTPSERVICE.get(this.CONSTANT.ASSETMETADATA_API).subscribe(
      (data: any) => {
        this.allAssetData = data;
        this.assetLength = data.length;
        this.getAllAssetType();
        this.getAllAssetMapData();

        this.chartFunction();
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

  getAllAssetType() {
    this.HTTPSERVICE.get(this.CONSTANT.ASSET_TYPES_API).subscribe(
      (data: any) => {
        this.fetchData = data
        for (let i = 0; i < this.fetchData.length; i++) {
          this.count = 0;
          for (let j = 0; j < this.allAssetData.length; j++) {
            if (this.fetchData[i].asset_type_name.trim() == this.allAssetData[j].asset_type_name) {
              this.count += 1;
            }
          }
          var length = 6;
          var chars = '0123456789ABCDEF';
          var hex = '#';
          while (length--)
            hex += chars[(Math.random() * 16) | 0];
          this.assetType.push({ "type": this.fetchData[i].asset_type_name.trim(), "count": this.count, "color": hex });
        }
        this.donutFunction();
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

  bgcolor: any;
  allAssetBool: boolean = true;

  assetTypeChange(param) {
    this.bgcolor = param
    if (param == "all") {
      this.allAssetBool = true;
      this.HTTPSERVICE.get(this.CONSTANT.ASSETMETADATA_API).subscribe(
        (data: any) => {
          this.allAssetData = data;
          this.getAllAssetMapData();
        }
      );
    }
    else {
      this.allAssetBool = false;
      this.HTTPSERVICE.get(this.CONSTANT.ASSETMETADATA_API + '?asset_type_name=' + param).subscribe(
        (data: any) => {
          this.allAssetData = data;
          this.getAllAssetMapData();
        }
      );
    }

  }

  mapData: any[] = [];

  getAllAssetMapData() {
    this.mapData = [];
    for (let i = 0; i < this.allAssetData.length; i++) {
      var long = this.allAssetData[i].asset_Metadata.filter(e => e.key_name == 'Longitude')[0].key_value;
      var lat = this.allAssetData[i].asset_Metadata.filter(e => e.key_name == 'Latitude')[0].key_value;
      var asset_id = this.allAssetData[i].asset_id;
      let iconUrl = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      this.mapData.push({
        "asset_id": asset_id, "asset_name": this.allAssetData[i].asset_name,
        "asset_type": this.allAssetData[i].asset_type_name,
        "latitude": lat.substring(0, lat.length - 3), "longitude": long.substring(0, long.length - 3),
        "iconUrl": iconUrl
      });
    }
  }

  markerClicked(m) {
    this.router.navigate(['/asset_details'], { queryParams: { asset_id: m.asset_id } });
  }
  
  closeAlert() {
    this.errorBool = false;
  }

}
