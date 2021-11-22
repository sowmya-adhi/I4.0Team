import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';

@Component({
    selector: 'app-new-form-modal',
    templateUrl: './new-form-modal.component.html',
    //styleUrls: ['./new-form-modal.component.css']
})
export class NewFormModalComponent implements OnInit {
    // @Input() area!: string;
    // @Input() category!: string;
    // @Input() question!: string;
    // @Input() weight!: string;
    // @Input() target_score!: string;
    area_arr: Array<{
        Assessment_Area_Id: string,
        Assessment_Area: string,
    }>=[]
    categories_arr:Array<{
        CategoryName: string,
        CategoryID: string
    }>=[];
    emptyCategory:boolean=false
    addArea: boolean = false;
    addCategory: boolean = false;
    current_val: any;
    myForm!: FormGroup;
    weights: any = [5, 10, 20, 30];
    target_scores: any = [1, 2, 3, 4, 5];
    categories: any;
    selected_area: any;
    area_db: any = {
        'Organional Readiness': [
            'Business Use cases',
            'LEadership and Culture',
            'Strategy',
            'Team Readiness',
            'Technology'
        ],
        'Data Readiness': [
            'Data Volume',
            'Data Speed',
            'Data Diversity',
            'Data Integration',
            'Data Governance',
            'Data Storage'
        ],
        'Infra Readiness': [
            'Distributed and Scalable Architecture',
            'IoT Edge Technologies',
            'Storage Teachnologies',
            'Security'
        ]
    };
    areas: any = ['Organional Readiness', 'Data Readiness', 'Infra Readiness', 'Add New Area'];
    selected_category: any;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,private CONSTANT: Constant, private HTTPSERVICE: HttpService, private httpclient : HttpClient) {}

    ngOnInit(): void {
        const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Assessment_Area_API);
        getSubscribe.subscribe(
            (data: Array<{
              Assessment_Area_Id: string,
              Assessment_Area: string,
              Target_Score: string,
              Weightage: string
            }>) => 
            {   
               for(let i=0;i<data.length;i++){
                   this.area_arr.push({ "Assessment_Area": data[i]["Assessment_Area"], "Assessment_Area_Id": data[i]["Assessment_Area_Id"]} )
               }
               this.area_arr.push({"Assessment_Area":"Add New Area", "Assessment_Area_Id": "324"})
               console.log("area data logged after retieving from server")
               //this.AreaChanged(this.area_arr[0]["Assessment_Area"])
               
               console.log(this.area_arr)
              
            },
        );
        this.createForm();
    }
    insertNewArea(val: any){
        console.log("insert new area has been click with value: "+val)
        console.log("insert new area has been clicked with value "+val)
        const getSubscribe = this.HTTPSERVICE.post(this.CONSTANT.AssessmentArea_API,{
            "Assessment_Area": val,
            "Target_Score": "2",
            "Weightage": "5"
          });
          getSubscribe.subscribe((data: any)=>{
              console.log("data added successfully!!");
              this.area_arr=[]
              this.addArea=!this.addArea
              this.addCategory=!this.addCategory
              this.ngOnInit();
          });
        
    }
    insertNewCategory(val:any){
        let area_id:number ;
        for(let i=0;i<this.area_arr.length;i++){
            if(this.area_arr[i]["Assessment_Area"]===this.selected_area)
                area_id=Number(this.area_arr[i]["Assessment_Area_Id"])
        }
        const getSubscribe = this.HTTPSERVICE.post(this.CONSTANT.Category_API,{
            "Assessment_Area_Id": area_id,
            "Category": val,
            
          });
          getSubscribe.subscribe((data: any)=>{
              console.log("Category data added successfully!!");
              this.area_arr=[]
              this.addArea=false
              this.addCategory=false
              this.ngOnInit();
          });
    }
    toggleAddArea(){
       // this.myForm.setValue({ area: this.selected_area, category: '', question: '',statement:"", weight: '', target_score: '' });
       this.myForm.get('area').setValue("")
       this.myForm.get('category').setValue("")
        this.categories_arr.length=0
        console.log(this.categories_arr)
        this.addArea=!this.addArea
        // this.addCategory=!this.addCategory
    }
    toggleAddCategory(){
        this.addCategory=!this.addCategory
    }

    private createForm() {
        this.myForm = this.formBuilder.group({
            // area:this.area,
            // category: this.category,
            // question:this.question,
            // weight:this.weight,
            // target_score: this.target_score
            area: '',
            category: '',
            question: '',
            statement:"",
           
        });
    }
    submitForm() {
         let area_id:number ;
        for(let i=0;i<this.area_arr.length;i++){
            if(this.area_arr[i]["Assessment_Area"]===this.selected_area)
                area_id=Number(this.area_arr[i]["Assessment_Area_Id"])
        }
        console.log('in submit form!');
        console.log("selected category:"+this.selected_category)
        console.log(this.categories_arr)
        let cat_id:number;
        for(let i=0;i<this.categories_arr.length;i++){
            if(this.categories_arr[i]["CategoryName"]===this.selected_category){
                cat_id=Number(this.categories_arr[i]["CategoryID"])
            }
        }
        let body:any={
            "Question": this.myForm.get("question").value,
            "Statement": this.myForm.get("statement").value,
            "Key": "I4.0"+this.selected_area+this.selected_category,
            "Category_Id": cat_id,
            "Assessment_Area_Id":area_id,
            "Question_Type_Id": 3,
            "Weightage":2
            
          }
          console.log(body)
        const getSubscribe = this.HTTPSERVICE.post(this.CONSTANT.Question_API,body);
          getSubscribe.subscribe((data: any)=>{
            console.log("Question added successfully!!");
            this.activeModal.close(this.myForm.value);
        });
        
        
       
      
    }

    closeModal() {
       // this.activeModal.close('Modal Closed');
       this.ngOnInit()
    }
    AreaChanged(val: any) {
        this.addCategory=false
        this.emptyCategory=false
        this.myForm.get("category").setValue("")
        console.log('onchange is working value received:'+val);
        if (val === 'Add New Area') {
            this.myForm.get('area').setValue("")
            this.myForm.get('category').setValue("")
            this.categories_arr.length=0
            this.addArea = true;
           // this.addCategory = true;
          //  this.current_val = this.myForm.value;
           // this.myForm.setValue({ area: '', category: '', question: '', weight: '', target_score: '' });
        }
        else{
            this.selected_area=val
            let area_id:string ;
            for(let i=0;i<this.area_arr.length;i++){
                if(this.area_arr[i]["Assessment_Area"]===val)
                    area_id=this.area_arr[i]["Assessment_Area_Id"]
            }
            const getSubscribe = this.HTTPSERVICE.get(this.CONSTANT.Category_API+"?Assessment_Area_Id="+area_id);
            getSubscribe.subscribe(
                (data: Array<{
                  Assessment_Area_Id: string,
                  Category: string,
                  Category_Id: string,
                  
                }>) => 
                {   
                    this.categories_arr=[]
                  for(let i=0;i<data.length;i++){
                      this.categories_arr.push({"CategoryID":data[i]["Category_Id"],"CategoryName":data[i]["Category"]})
                  }
                if(this.categories_arr.length===0){
                     this.addCategory=!this.addCategory
                     this.emptyCategory=true
                }
                else{
                    this.categories_arr.push({"CategoryID":'invalidID',"CategoryName":'Add new Category'})
                  
                }
                 // this.CategoryChanged(this.categories[0]["CategoryName"])
                  console.log(this.categories_arr)
                  
                },
            );
      

        }
        // else {
        //     this.selected_area = val;
        //     this.categories = this.area_db[val];
        //     this.categories.push('Add new Category');
        //     console.log(this.selected_area);
        // }
    }
    categoryChanged(val: any) {
        console.log('onchange category is working');
        this.selected_category=val
        if (val === 'Add new Category') {
            this.addCategory = true;
            this.myForm.setValue({ area: this.selected_area, category: '', question: '',statement:"" });
        }
    }
}
