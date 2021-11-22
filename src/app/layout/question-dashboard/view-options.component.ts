import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constant } from '../../config/constant';
import { HttpService } from '../../config/http.service';

@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.css']
})
export class ViewOptionsComponent implements OnInit {

  options_arr:Array<{
    Question_Option_Id:string,
    Option:string,
    Question_Id:string,
    Maturity_Level:string

  }>=[]
  constructor(private CONSTANT: Constant,public activeModal: NgbActiveModal,  private HTTPSERVICE: HttpService,) { }

  ngOnInit(): void {
    console.log("from view modal "+sessionStorage.getItem("question_id"))
    let q_id:string=sessionStorage.getItem("question_id")
    this.HTTPSERVICE.get(this.CONSTANT.Question_Option_Api+'?Question_Id='+q_id).subscribe(
      (data:Array<{
        Question_Option_Id:string,
        Option:string,
        Question_Id:string,
        Maturity_Level:string
    
      }>)=>{
        console.log("options for the question_id: "+q_id)
        console.log(data)
        this.options_arr=data

      }
      )
    
  }

}
