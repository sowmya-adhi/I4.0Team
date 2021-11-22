import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../config/constant';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class HttpService {
    [x: string]: any;
    private baseUrl: any;
    constructor(private http: HttpClient, private CONSTANT: Constant, public router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.baseUrl = event.url;
            }
        });
    }

    get(apiUrl: string) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', `*/*`);
 
        this.access_Token = JSON.parse(localStorage.getItem('userdetails'));
        if (this.access_Token != null) {
            this.accessToken = this.access_Token.access_Token;
        }
 
        if (this.accessToken && this.accessToken !== 'null') {
            headers = headers.append("Authorization", "bearer " + this.accessToken);
 
        } else {
            this.router.navigate(['/login']);
        }
        return this.http.get(apiUrl, { headers });
 
    }

    put(apiUrl: string, body: any) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', `*/*`);

        this.access_Token = JSON.parse(localStorage.getItem('userdetails'));

        if (this.access_Token != null) {
            this.accessToken = this.access_Token.access_Token;
        }

        if (this.accessToken && this.accessToken !== 'null') {
            headers = headers.append("Authorization", "bearer " + this.accessToken);
        } else {
            this.router.navigate(['/login']);
        }

        return this.http.put<any>(apiUrl, body, { headers });
    }

    delete(apiUrl: string) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', `*/*`);


        this.access_Token = JSON.parse(localStorage.getItem('userdetails'));

        if (this.access_Token != null) {
            this.accessToken = this.access_Token.access_Token;
        }
        if (this.accessToken && this.accessToken !== 'null') {
            headers = headers.append("Authorization", "bearer " + this.accessToken);
        }else {
            this.router.navigate(['/login']);
        }
        return this.http.delete(apiUrl, { headers });
    }


    post(apiUrl: string, body: any, isContentTypeNeeded: boolean = true) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', `*/*`);

        this.access_Token = JSON.parse(localStorage.getItem('userdetails'));

        if (this.access_Token != null) {
            this.accessToken = this.access_Token.access_Token;
        }
        if (this.accessToken && this.accessToken !== 'null') {
            headers = headers.append("Authorization", "bearer " + this.accessToken);
        }else {
            this.router.navigate(['/login']);
        }
        return this.http.post<any>(apiUrl, body, { headers });

    }
    login(apiUrl: string, body: any, isContentTypeNeeded: boolean = true) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', `*/*`);

        //this.access_Token = JSON.parse(localStorage.getItem('userdetails'));
        //this.accessToken = this.access_Token;
       // if (this.accessToken && this.accessToken !== 'null') {
          //  headers = headers.append("Authorization", "bearer " + this.accessToken);
       // }
        return this.http.post<any>(apiUrl, body, { headers });

    }
    errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
    

}


