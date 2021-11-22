import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import json_data from './question_data.json';
import { NewFormModalComponent } from './new-form-modal.component';
import { HttpService } from '../../config/http.service';
import { Constant } from '../../config/constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export interface iQuestion {
    Area: string;
    Assessment_Type: string;
    Category: string;
    Srl_No: number;
    Key: string;
    Question: string;
    Statement: string;
    Weight: string;
    Target_Score: string;
    
}
@Component({
    selector: 'app-question-dashboard',
    templateUrl: './question-dashboard.component.html',
    styleUrls: ['./question-dashboard.component.css']
})
export class QuestionDashboardComponent implements OnInit {
    question_db: Array<iQuestion>=[];
    area_arr: Array<{
        Assessment_Area_Id: string,
        Assessment_Area: string,
    }>=[]
    a1: Array<{
        Area: string,
        Category: Array<string>
    }>=[]
    categories:Array<{
        CategoryName: string,
        CategoryID: string
    }>=[];
    split_db: {[id:string]:Array<{
        question:string,
        Key:string
    }>}
    selected_area !:string
    selected_category!:string
    selected_qs:Array<{
        Area: string,
        Category: string,
        Question:string,
        Statement:string
        Key:string

    }>=[]
    constructor(private CONSTANT: Constant,public modalService: NgbModal,private router: Router, private HTTPSERVICE: HttpService, private httpclient : HttpClient) {
        console.log("constructor");
    }

    ngOnInit(): void {
        //this.question_db = json_data;
        console.log("oninti")
        this.area_arr=[]
        //  let area_arr: Array<string>=[]
         
        // for(let i=0;i<this.question_db.length;i++){
        //     let flag:boolean=false;
        //     if(area_arr.length==0){
        //         area_arr.push(this.question_db[i].Area)
        //     }
        //     else{
        //         for(let j=0;j<area_arr.length;j++){
        //             if(this.question_db[i].Area===area_arr[j]) flag=true
        //         }
        //         if(!flag){
        //             area_arr.push(this.question_db[i].Area)
        //         }
        //     }
        // }

        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Assessment_Area_API);
      getSubscribe.subscribe(
          (data: Array<{
            Assessment_Area_Id: string,
            Assessment_Area: string,
            
          }>) => 
          {   
             for(let i=0;i<data.length;i++){
                 this.area_arr.push({ "Assessment_Area": data[i]["Assessment_Area"], "Assessment_Area_Id": data[i]["Assessment_Area_Id"]} )
             }
             console.log("area data logged after retieving from server")
             this.AreaChanged(this.area_arr[0]["Assessment_Area"])
             
             console.log(this.area_arr)
            
          },
      );

       // this.area_arr=area_arr
        

    //    let a1: Array<{
    //         Area: string,
    //         Category: Array<string>
    //     }>=[]
    //     for(let i=0;i<area_arr.length;i++){
    //         let arr:Array<string>=[];
    //         for(let j=0;j<this.question_db.length;j++){
    //             if(this.question_db[j].Area===area_arr[i]){
    //                 let flag:boolean=false;
    //                 if(arr.length===0){
    //                     arr.push(this.question_db[j].Category)
    //                 }
    //                 else{
    //                     for(let k=0;k<arr.length;k++){
    //                         if(arr[k]===this.question_db[j].Category){
    //                             flag=true
    //                         }
    //                     }
    //                     if(!flag) arr.push(this.question_db[j].Category)
    //                 }
    //             }
    //         }
    //         a1.push({"Area":area_arr[i],"Category":arr})
    //     }
    //     this.a1=a1
     //   this.categories=this.a1[0].Category
    //    this.AreaChanged(this.area_arr[0])
        // console.log(area_arr)
        // // console.log(a1)
        // let area_selected:string="Organizational Readiness"
        // let category_selected:string="Technology"
    //    let selected_qs:Array<{
    //         Area: string,
    //         Category: string,
    //         Question:string,
    //         Weight:string,
    //         Target_Score:number

    //     }>=[]
    //     // for(let i=0;i<this.question_db.length;i++){
            
        //     if(this.question_db[i].Area===area_selected && this.question_db[i].Category===category_selected){
        //         selected_qs.push({
        //             Area: this.question_db[i].Area,
        //             Category: this.question_db[i].Category,
        //             Question:this.question_db[i].Question,
        //             Weight:this.question_db[i].Weight,
        //             Target_Score:this.question_db[i].Target_Score
        //         })
        //     }
        // }
        // console.log(selected_qs)



    }
    openFormModal() {
        console.log('inside open form modal in new-q component');
        console.log(NewFormModalComponent);
        var modalRef = this.modalService.open(NewFormModalComponent);
        console.log('after opening');
        // modalRef.componentInstance.area="Data Readiness"
        // modalRef.componentInstance.category="Data Speed"
        // modalRef.componentInstance.question="aslkhdaslkjasldjald"
        // modalRef.componentInstance.wight=20
        // modalRef.componentInstance.target_score="2"
        modalRef.result
            .then((result) => {
                console.log('from new-q-component');
                console.log(result);
            })
            .catch((error) => {
                console.log('Error:' + error);
            });
    }
    AreaChanged(val:any){
        console.log("area changed called with "+val)
        this.selected_area=val;
        let area_id:string ;
        for(let i=0;i<this.area_arr.length;i++){
            if(this.area_arr[i]["Assessment_Area"]===val)
                area_id=this.area_arr[i]["Assessment_Area_Id"]
        }
        console.log("id for area: "+this.selected_area+" is : "+area_id)
        // let params1= new HttpParams();
        // params1.append("Assessment_Area_Id",area_id)
        // console.log(params1)
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Category_API+"?Assessment_Area_Id="+area_id);
        getSubscribe.subscribe(
            (data: Array<{
              Assessment_Area_Id: string,
              Category: string,
              Category_Id: string,
              
            }>) => 
            {   
                this.categories=[]
              for(let i=0;i<data.length;i++){
                  this.categories.push({"CategoryID":data[i]["Category_Id"],"CategoryName":data[i]["Category"]})
              }
              console.log(this.categories)
              this.CategoryChanged(this.categories[0]["CategoryName"])
              
              
            },
        );
  
        

        // for(let i=0;i<this.a1.length;i++){
        //     if(val===this.a1[i].Area){
        //         this.categories=this.a1[i].Category
        //        this.CategoryChanged(this.categories[0])
        //         break;
        //     }
        // }

        
    }
    CategoryChanged(val:any){
        console.log("from category changed with value|: "+val)
        this.selected_category=val
        this.selected_qs=[]
        
        let area_id:string ;
        for(let i=0;i<this.area_arr.length;i++){
            if(this.area_arr[i]["Assessment_Area"]===this.selected_area)
                area_id=this.area_arr[i]["Assessment_Area_Id"]
        }
        let cat_id:string;
        for(let i=0;i<this.categories.length;i++){
            if(this.categories[i]["CategoryName"]===this.selected_category){
                cat_id=this.categories[i]["CategoryID"]
            }
            
        }
        console.log("id for area: "+this.selected_area+" is : "+area_id)
        console.log("id for area: "+this.selected_category+" is : "+cat_id)
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Question_API+"?Assessment_Area_Id="+area_id+"&"+"Category_Id="+cat_id);
        getSubscribe.subscribe(
            (data: Array<{
                Question: string,
                Statement: string,
                Key: string,
                Category_Id: string ,
                Assessment_Area_Id: string ,
                Question_Type_Id: string ,
                Weightage: string
            }>) => 
            {   
                for(let i=0;i<data.length;i++){
                    this.selected_qs.push({
                        Area: this.selected_area,
                        Category: this.selected_category,
                        Question:data[i]["Question"],
                       Statement:data[i]["Statement"],
                        Key: data[i]["Key"],
                     
                    })
                }
              
            },
        );

    }
    editdata(val:any){
        console.log("question to be edited is with key: "+val)

    }
    delete(val:any){
        console.log("question to be deleted is with key: "+val)
    }
}
