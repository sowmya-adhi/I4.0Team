import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  assessData: any[] = [{assess_id:1, name:"RajPriya", organization:"LTI", score:87},
                        {assess_id:2, name:"Harish", organization:"Honda", score:56},
                        {assess_id:3, name:"Leka", organization:"Clarios", score:93}]
  constructor() { }

  ngOnInit(): void {
  }

}
