import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Constant } from 'src/app/config/constant';
// import { HttpService } from 'src/app/config/http.service';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';
import questionData from './question_data.json';

@Component({
    selector: 'app-questionselection',
    templateUrl: './questionselection.component.html',
    styleUrls: ['./questionselection.component.scss']
})
export class QuestionselectionComponent implements OnInit {
    questions: { Area: string; Category: string; Key: string; Srl_No: number; Question: string }[] = questionData;
    myArea!: string;
    ques_area !: string;
    ques_category !: string;
    count: number = 0;
    myCategory!: string;
    AreaId !: string;
    CategoryID !: string;
    selected_qs: Array<{
      Question_Id: string;
      Question: string;
      Category_Id: string;
      Assessment_Area_Id: string;
      isselected: boolean
        
    }> = [];
    a1: Array<{
        Area: string;
        Category: Array<string>;
    }> = [];
    category: Array<{
      Category_Id: string;
      Category: string;
      Assessment_Area_Id: string;

    }>= [];
    area_arr: Array<
    {
      Assessment_Area: string,
      Assessment_Area_Id: string

    }> = [];

    popup = false;
    view = false;

    selected_id: Array<{
      //add ques id
        Question_Id: string;
        Question: string;
        Category: string;
        Area: string;
    }> = [];

    constructor(private CONSTANT: Constant,private router: Router, private HTTPSERVICE: HttpService, private httpclient : HttpClient) {}

    ngOnInit(): void {

        console.log('from questionselection component');

        // for (let i = 0; i < this.questions.length; i++) {
        //     let flag: boolean = false;
        //     if (this.area_arr.length == 0) {
        //         this.area_arr.push(this.questions[i].Area);
        //     } else {
        //         for (let j = 0; j < this.area_arr.length; j++) {
        //             if (this.questions[i].Area === this.area_arr[j]) flag = true;
        //         }
        //         if (!flag) {
        //             this.area_arr.push(this.questions[i].Area);
        //         }
        //     }
        // }
        // console.log(this.area_arr);
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Assessment_Area_API);      
        getSubscribe.subscribe( (data: Array<{ 
          Assessment_Area_Id: string,            
          Assessment_Area: string,            
          Target_Score: string,            
          Weightage: string  }>) => {                
            for(let i=0;i<data.length;i++){                 
              this.area_arr.push({ "Assessment_Area": data[i]["Assessment_Area"], "Assessment_Area_Id": data[i]["Assessment_Area_Id"]} )             
            }             
            console.log("area data logged after retieving from server")                                    
            console.log(this.area_arr)                      
          },  
          );



        // for (let i = 0; i < this.area_arr.length; i++) {
        //     let arr: Array<string> = [];
        //     for (let j = 0; j < this.questions.length; j++) {
        //         if (this.questions[j].Area === this.area_arr[i]["Assessment_Area"]) {
        //             let flag: boolean = false;
        //             if (arr.length === 0) {
        //                 arr.push(this.questions[j].Category);
        //             } else {
        //                 for (let k = 0; k < arr.length; k++) {
        //                     if (arr[k] === this.questions[j].Category) {
        //                         flag = true;
        //                     }
        //                 }
        //                 if (!flag) arr.push(this.questions[j].Category);
        //             }
        //         }
        //     }
        //     this.a1.push({ Area: this.area_arr[i]["Assessment_Area"], Category: arr });
        // }

        // console.log(this.area_arr);
        // console.log(this.a1);
    }

    updatecategory(areaname: any) {
        //   console.log('inside update category')
        //   switch (areaname) {
        //     case 'Organizational Readiness':
        //       this.category = this.OrganizationalReadiness;
        //       break;
        //     case 'Data Readiness':
        //       this.category = this.DataReadiness;
        //       break;
        //     case 'Infrastructure Readiness':
        //       this.category = this.InfrastructureReadiness;
        //       break;
        //     case 'Analytics Readiness':
        //       this.category = this.AnalyticsReadiness;
        //       break;
        //     case 'IT and Operations Readiness':
        //       this.category = this.ITandOperationsReadiness;
        //       break;
        //     case 'Quality Management':
        //       this.category = this.QualityManagement;
        //       break;
        //   }
        //   console.log(this.myArea)
        //   console.log(this.myCategory)
        // console.log(this.selected_qs)
    }

    changedArea(enteredArea: any) {

      console.log(enteredArea)
      this.myArea = enteredArea
      console.log(this.myArea)
       for(let i=0;i<this.area_arr.length;i++)
       {
            if(this.area_arr[i].Assessment_Area === this.myArea)
            {
              this.AreaId=this.area_arr[i].Assessment_Area_Id
            }
       }

       console.log(this.AreaId)
     
       
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Category_API);      
        getSubscribe.subscribe( (data: Array<{ 
          Question_Id: string,
          Category_Id: string,            
          Category: string,            
          Assessment_Area_Id: string   }>) => {                
            for(let i=0;i<data.length;i++){  
              if(this.AreaId === data[i].Assessment_Area_Id)
              {
                this.category.push({Category_Id : data[i]["Category_Id"], Category : data[i]["Category"], Assessment_Area_Id : data[i]["Assessment_Area_Id"] })
              }               
            }             
            // console.log("data from category array")                                    
            // console.log(this.category)                      
          },  
          );
          console.log("data from category array")                                    
          console.log(this.category)

        // for (let i = 0; i < this.a1.length; i++) {
        //     if (this.a1[i].Area == this.myArea) {
        //         this.category = this.a1[i].Category;
        //     }
        // }
    }
    changedCategory(enteredCatogory: any) {

      console.log(enteredCatogory)
      this.myCategory = enteredCatogory
       for(let i=0;i<this.category.length;i++)
       {
            if(this.category[i].Category === this.myCategory)
            {
              this.CategoryID =this.category[i].Category_Id
              break
            }
       }
       console.log(this.CategoryID)
       this.selected_qs = [];

       const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Question_API);      
       getSubscribe.subscribe( (data: Array<{ 
        Question: string,
        Statement: string,
        Key: string,
        Category_Id: string,
        Assessment_Area_Id: string,
        Question_Type_Id: string
            }>) => {   
           console.log("data array")
           console.log(data)             
           for(let i=0;i<data.length;i++){  
             if(this.AreaId === data[i].Assessment_Area_Id && this.CategoryID === data[i].Category_Id)
             {
               this.selected_qs.push( {Question_Id : data[i]["Question_Id"], Question : data[i]["Question"], Category_Id : data[i]["Category_Id"] , Assessment_Area_Id : data[i]["Assessment_Area_Id"], isselected: false})
             }               
           }
         }
       );
      console.log(this.selected_qs)             




        // this.myCategory = enteredCatogory;
        // this.selected_qs = [];
        // for (let i = 0; i < this.questions.length; i++) {
        //     if (this.questions[i].Area === this.myArea && this.questions[i].Category === this.myCategory) {
        //         this.selected_qs.push({
        //             Area: this.questions[i].Area,
        //             Category: this.questions[i].Category,
        //             Question: this.questions[i].Question,
        //             Key: this.questions[i].Key,
        //             isselected: false
        //         });
        //     }
        // }
     }


    onchange() {
        console.log(this.selected_qs)
    }

    count_fn() {


        this.count = 0
        for (let i = 0; i < this.selected_qs.length; i++) {
            if (this.selected_qs[i].isselected) {
                this.count++;
                console.log("before if")
                // this.ques_area= this.selected_qs[i].Assessment_Area_Id
                // console.log(this.ques_area)
               
                console.log(this.selected_qs[i].Category_Id)
                console.log(this.category[i].Category_Id)
                for(let j=0; j<this.area_arr.length; j++)
                {
                  if(this.selected_qs[i].Assessment_Area_Id === this.area_arr[j].Assessment_Area_Id)
                  {
                    this.ques_area= this.area_arr[j].Assessment_Area
                    console.log("imported area")
                    console.log(this.ques_area)
                    break
                  }
                  
                }
               
                
                for(let j=0; j<this.category.length;j++)
                {
                  if(this.selected_qs[i].Category_Id === this.category[j].Category_Id)
                  {
                    this.ques_category = this.category[j].Category
                    console.log(this.ques_category)
                    break
                   
                  }
                }
                
                this.selected_id.push({
                  Question_Id: this.selected_qs[i].Question_Id,
                  Question: this.selected_qs[i].Question,
                  Category: this.ques_category,
                  Area: this.ques_area
                });
                console.log(this.selected_id[i].Area)
            }
        }
       
    }
}
