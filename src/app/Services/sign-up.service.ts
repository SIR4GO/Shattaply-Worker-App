import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkerModel} from '../Models/WorkerModel';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',

        })
    };
    constructor(private httpClient: HttpClient) { }

    developmentUrl = 'http://shataply/api/storeWorker';
    productionUrl  = 'http://192.168.1.3:80/api/storeWorker';
    addWorker(worker: WorkerModel): Observable<any>
    {
        return this.httpClient.post(this.productionUrl , worker , this.httpOptions);
    }
}
