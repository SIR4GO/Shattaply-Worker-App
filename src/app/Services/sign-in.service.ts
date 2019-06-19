import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkerModel} from '../Models/WorkerModel';
import { SigInRequestModel } from '../Models/SigInRequestModel';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',

    })
};

developmentUrl = 'http://shataply/api/loginWorkers';
productionUrl  = 'http://192.168.1.3:80/api/loginWorkers';

constructor(private httpClient: HttpClient) { }

signInWorker(signInReqModel: SigInRequestModel): Observable<any> {

  return this.httpClient.post(this.productionUrl , signInReqModel , this.httpOptions);
}


}
