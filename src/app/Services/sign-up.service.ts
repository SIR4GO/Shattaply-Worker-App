import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkerModel} from '../Models/WorkerModel';
import { Config } from '../config';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

    config: Config = new Config();

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
        return this.httpClient.post(this.config.hostAddress + '/api/storeWorker' , worker , this.httpOptions);
    }
}
