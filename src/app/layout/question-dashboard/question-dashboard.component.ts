import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import json_data from './question_data.json';
import { NewFormModalComponent } from './new-form-modal.component';
import { HttpService } from '../../config/http.service';
import { Constant } from '../../config/constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ViewOptionsComponent } from './view-options.component';

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
    area_arr: Array<{
        Assessment_Area_Id: string;
        Assessment_Area: string;
    }> = [];

    category_arr: Array<{
        category: string;
        cateogry_id: string;
        assessment_area_id: string;
    }> = [];

    question_arr: Array<{
        Question_Id: string;
        Question: string;
        Statement: string;
        Category_Id: string;
        Assessment_Area_Id: string;
        Weightage: string;
        Target_Score: string;
        Question_Type_Id: string;
    }> = [];
    question_option_arr: Array<{
        Question_Type_Id: string;
        Question_Type: string;
    }> = [];
    filtered_question_arr: Array<{
        Question_Id: string;
        Question: string;
        Statement: string;
        Category_Id: string;
        CategoryName: string;
        Assessment_Area_Id: string;
        AssessmentAreaName: string;
        Weightage: string;
        Target_Score: string;
        Question_Type_Id: string;
        Question_Type_Name: string;
    }> = [];

    question_db: Array<{
        Question_Id: string;
        Question: string;
        Statement: string;
        Category_Id: string;
        CategoryName: string;
        Assessment_Area_Id: string;
        AssessmentAreaName: string;
        Weightage: string;
        Target_Score: string;
        Question_Type_Id: string;
        Question_Type_Name: string;
    }> = [];

    a1: Array<{
        Area: string;
        Category: Array<string>;
    }> = [];
    categories: Array<{
        CategoryName: string;
        CategoryID: string;
    }> = [];
    split_db: {
        [id: string]: Array<{
            question: string;
            Key: string;
        }>;
    };
    selected_area!: string;
    selected_category!: string;
    selected_qs: Array<{
        Area: string;
        Category: string;
        Question: string;
        Statement: string;
        Weightage: number;
        Target_Score: number;
    }> = [];
    dropdown_arr: Array<string> = ['View All'];
    viewselected_arr: Array<string> = [];
    p: number = 1;

    constructor(
        private CONSTANT: Constant,
        public modalService: NgbModal,
        private router: Router,
        private HTTPSERVICE: HttpService,
        private httpclient: HttpClient
    ) {
        console.log('constructor');
        
    }

    openOptionModal(question_id: any){
        console.log("clicked from question_id:"+question_id)
        sessionStorage.setItem('question_id',question_id)
        console.log('inside open form modal in new-q component');
        console.log(ViewOptionsComponent);
        var modalRef = this.modalService.open(ViewOptionsComponent);
        console.log('after opening');
        modalRef.result
            .then((result) => {
                console.log('from new-q-component');
                console.log(result);
            })
            .catch((error) => {
                console.log('Error:' + error);
                sessionStorage.removeItem('question_id')
            });

    }
    onCheckBoxChange(id: any, check_event: any) {
        console.log('cehck box with id: ' + id + ' has been chnaged to: ' + check_event.target.checked);
        if (check_event.target.checked) {
            this.viewselected_arr.push(id);
        } else {
            for (let i = 0; i < this.viewselected_arr.length; i++) {
                if (this.viewselected_arr[i] === id) {
                    this.viewselected_arr.splice(i, 1);
                }
            }
        }
        console.log('view_selected_arr');
        console.log(this.viewselected_arr);
        this.filtered_question_arr=[]
        let flag:boolean=true
        for(let i=0;i<this.viewselected_arr.length;i++){
            if(this.viewselected_arr[i]==="View All"){
                this.filtered_question_arr=this.question_db
                flag=false
                break;
            }
        }
        if(flag){
            for(let i=0;i<this.question_db.length;i++){
                for(let j=0;j<this.viewselected_arr.length;j++){
                    if(this.viewselected_arr[j]===this.question_db[i]["AssessmentAreaName"]){
                        this.filtered_question_arr.push(this.question_db[i])
                        break
                    }
                }
            }
        }
    }

    async ngOnInit(): Promise<void> {
        
        console.log('oninti');
        this.area_arr = [];
        this.dropdown_arr= ['View All'];
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.AssessmentArea_API);
        getSubscribe.subscribe(
            (
                data: Array<{
                    Assessment_Area_Id: string;
                    Assessment_Area: string;
                }>
            ) => {
                for (let i = 0; i < data.length; i++) {
                    this.area_arr.push({
                        Assessment_Area: data[i]['Assessment_Area'],
                        Assessment_Area_Id: data[i]['Assessment_Area_Id']
                    });
                    this.dropdown_arr.push(data[i]['Assessment_Area']);
                }
                console.log('area data logged after retieving from server');
                // this.AreaChanged(this.area_arr[0]["Assessment_Area"])

                console.log(this.area_arr);
            }
        );
        this.category_arr=[]
        this.HTTPSERVICE.get(this.CONSTANT.Category_API).subscribe(
            (
                data: Array<{
                    Category_Id: string;
                    Category: string;
                    Assessment_Area_Id: string;
                }>
            ) => {
                for (let i = 0; i < data.length; i++) {
                    this.category_arr.push({
                        category: data[i]['Category'],
                        cateogry_id: data[i]['Category_Id'],
                        assessment_area_id: data[i]['Assessment_Area_Id']
                    });
                }
                console.log('categories_arr details');
                console.log(this.category_arr);
            }
        );
        this.question_arr=[]
        this.HTTPSERVICE.get(this.CONSTANT.Question_API).subscribe(
            (
                data: Array<{
                    Question_Id: string;
                    Question: string;
                    Statement: string;
                    Category_Id: string;
                    Assessment_Area_Id: string;
                    Weightage: string;
                    Target_Score: string;
                    Question_Type_Id: string;
                }>
            ) => {
                this.question_arr = data;
                console.log('questions has been received!!');
                console.log(this.question_arr);
                //  this.filtered_question_arr= this.question_arr
            }
        );
        this.HTTPSERVICE.get(this.CONSTANT.Question_Type_Api).subscribe(
            (
                data: Array<{
                    Question_Type_Id: string;
                    Question_Type: string;
                }>
            ) => {
                this.question_option_arr = data;
                console.log('data received from option table');
                console.log(this.question_option_arr);
            }
        );
        await this.delay(1100);
        console.log('after 200ms delay');
        this.filtered_question_arr=[]
        for (let i = 0; i < this.question_arr.length; i++) {
            let areaname: string;
            let categoryname: string;
            let question_option_name: string;
            for (let j = 0; j < this.area_arr.length; j++) {
                if (this.area_arr[j]['Assessment_Area_Id'] === this.question_arr[i]['Assessment_Area_Id']) {
                    areaname = this.area_arr[j]['Assessment_Area'];
                    break;
                }
            }
            for (let j = 0; j < this.category_arr.length; j++) {
                if (this.category_arr[j]['cateogry_id'] === this.question_arr[i]['Category_Id']) {
                    categoryname = this.category_arr[j]['category'];
                    break;
                }
            }
            for (let j = 0; j < this.question_option_arr.length; j++) {
                if (this.question_option_arr[j]['Question_Type_Id'] === this.question_arr[i]['Question_Type_Id']) {
                    question_option_name = this.question_option_arr[j]['Question_Type'];
                }
            }
            this.filtered_question_arr.push({
                Question_Id: this.question_arr[i]['Question_Id'],
                Question: this.question_arr[i]['Question'],
                Statement: this.question_arr[i]['Statement'],
                Category_Id: this.question_arr[i]['Category_Id'],
                CategoryName: categoryname,
                Assessment_Area_Id: this.question_arr[i]['Assessment_Area_Id'],
                AssessmentAreaName: areaname,
                Weightage: this.question_arr[i]['Weightage'],
                Target_Score: this.question_arr[i]['Target_Score'],
                Question_Type_Id: this.question_arr[i]['Question_Type_Id'],
                Question_Type_Name: question_option_name
            });
        }
        this.question_db = this.filtered_question_arr;
        console.log('filtered questions');
        console.log(this.filtered_question_arr);
    }
    private delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    openFormModal() {
        console.log('inside open form modal in new-q component');
        console.log(NewFormModalComponent);
        var modalRef = this.modalService.open(NewFormModalComponent);
        console.log('after opening');
        modalRef.result
            .then((result) => {
                console.log('from new-q-component');
                console.log(result);
                this.ngOnInit();
            })
            .catch((error) => {
                console.log('Error:' + error);
                if(error==='Done'){
                    this.ngOnInit();
                }
            });
    }
    // AreaChanged(val: any) {
    //     console.log('area changed called with ' + val);
    //     this.selected_area = val;
    //     let area_id: string;
    //     for (let i = 0; i < this.area_arr.length; i++) {
    //         if (this.area_arr[i]['Assessment_Area'] === val) area_id = this.area_arr[i]['Assessment_Area_Id'];
    //     }
    //     console.log('id for area: ' + this.selected_area + ' is : ' + area_id);
    //     const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Category_API + '?Assessment_Area_Id=' + area_id);
    //     getSubscribe.subscribe(
    //         (
    //             data: Array<{
    //                 Assessment_Area_Id: string;
    //                 Category: string;
    //                 Category_Id: string;
    //             }>
    //         ) => {
    //             this.categories = [];
    //             for (let i = 0; i < data.length; i++) {
    //                 this.categories.push({ CategoryID: data[i]['Category_Id'], CategoryName: data[i]['Category'] });
    //             }
    //             console.log(this.categories);
    //             this.CategoryChanged(this.categories[0]['CategoryName']);
    //         }
    //     );
    // }
    // CategoryChanged(val: any) {
    //     console.log('from category changed with value|: ' + val);
    //     this.selected_category = val;
    //     this.selected_qs = [];

    //     let area_id: string;
    //     for (let i = 0; i < this.area_arr.length; i++) {
    //         if (this.area_arr[i]['Assessment_Area'] === this.selected_area)
    //             area_id = this.area_arr[i]['Assessment_Area_Id'];
    //     }
    //     let cat_id: string;
    //     for (let i = 0; i < this.categories.length; i++) {
    //         if (this.categories[i]['CategoryName'] === this.selected_category) {
    //             cat_id = this.categories[i]['CategoryID'];
    //         }
    //     }
    //     console.log('id for area: ' + this.selected_area + ' is : ' + area_id);
    //     console.log('id for area: ' + this.selected_category + ' is : ' + cat_id);
    //     const getSubscribe = this.HTTPSERVICE.get(
    //         this.CONSTANT.Question_API + '?Assessment_Area_Id=' + area_id + '&' + 'Category_Id=' + cat_id
    //     );
    //     getSubscribe.subscribe(
    //         (
    //             data: Array<{
    //                 Question: string;
    //                 Statement: string;
    //                 Category_Id: string;
    //                 Assessment_Area_Id: string;
    //                 Question_Type_Id: string;
    //                 Weightage: number;
    //                 Target_Score: number;
    //             }>
    //         ) => {
    //             for (let i = 0; i < data.length; i++) {
    //                 this.selected_qs.push({
    //                     Area: this.selected_area,
    //                     Category: this.selected_category,
    //                     Question: data[i]['Question'],
    //                     Statement: data[i]['Statement'],
    //                     Weightage: data[i]['Weightage'],
    //                     Target_Score: data[i]['Target_Score']
    //                 });
    //             }
    //         }
    //     );
    // }
    editdata(val: any) {
        console.log('question to be edited is with key: ' + val);
    }
    delete(val: any) {
        console.log('question to be deleted is with key: ' + val);
    }
}
