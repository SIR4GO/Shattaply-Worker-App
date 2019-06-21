import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})

export class RequestService {


config: Config = new Config();

httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',

    })
};

developmentUrl = 'http://shataply/api/storePreviousWork';
productionUrl  = 'http://192.168.1.3:80';

constructor(private httpClient: HttpClient) {
  console.log(this.config.hostAddress);
 }


getRequests(workerId: any): Observable<any> {

  return this.httpClient.post(this.config.hostAddress + '/api/showWorkerRequests' ,{worker_id: workerId }, this.httpOptions);
}

acceptRequest(reqID: any , workerId: any) : Observable<any> {
// tslint:disable-next-line: max-line-length
  return this.httpClient.post(this.config.hostAddress + '/api/WorkerdAcceptRequest' ,{ worker_id: workerId , request_id: reqID }, this.httpOptions);

}

rejectRequest(reqID: any , workerId: any) : Observable<any> {
// tslint:disable-next-line: max-line-length
  return this.httpClient.post(this.config.hostAddress + '/api/WorkerdeleteRequest' , { worker_id: workerId , request_id: reqID }, this.httpOptions);
}

countAvaliableRequests(workerId: any): Observable<any> {
  return this.httpClient.post(this.config.hostAddress + '/api/WorkerAvaliableRequests' , { worker_id: workerId}, this.httpOptions);
}

rateUser( userId: any , rateWeight: any ): Observable<any> {
  return this.httpClient.post(this.config.hostAddress + '/api/rateUser' , { user_id: userId , rate: rateWeight}, this.httpOptions);
}
                            // postive - negative
rateAcceptedRequest(reqId: any , rateType: any): Observable<any> {
  return this.httpClient.post(this.config.hostAddress + '/api/rateJob' , { request_id:  reqId , rate: rateType}, this.httpOptions);
}


}
