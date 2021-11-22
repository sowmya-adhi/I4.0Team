import { Injectable } from '@angular/core';
import { HttpService } from '../config/http.service';
import { Constant } from '../config/constant';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public message: boolean = false;
  public dataView: string;

 
  constructor(private _http: HttpService, private _constant: Constant) { }
  getRoles() {
    return this._http.get(this._constant.USERCONFIGURATION_API);
  }
  
  
}
  

