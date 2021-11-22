import { Injectable } from '@angular/core';
import { HttpService } from '../config/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private _http:HttpService) { }
}
