import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',

    })
};

developmentUrl = 'http://shataply/api/storePreviousWork';
productionUrl  = 'http://192.168.1.3:80';

constructor(private httpClient: HttpClient) { }


getRequests(workerId: any): Observable<any> {

  return this.httpClient.post(this.productionUrl + '/api/showWorkerRequests' ,{worker_id: workerId }, this.httpOptions);
}

acceptRequest(reqID: any , workerId: any) : Observable<any> {
// tslint:disable-next-line: max-line-length
  return this.httpClient.post(this.productionUrl + '/api/WorkerdAcceptRequest' ,{ worker_id: workerId , request_id: reqID }, this.httpOptions);

}

rejectRequest(reqID: any , workerId: any) : Observable<any> {
// tslint:disable-next-line: max-line-length
  return this.httpClient.post(this.productionUrl + '/api/WorkerdeleteRequest' , { worker_id: workerId , request_id: reqID }, this.httpOptions);
}

countAvaliableRequests(workerId: any) : Observable<any> {
  return this.httpClient.post(this.productionUrl + '/api/WorkerAvaliableRequests' , { worker_id: workerId}, this.httpOptions);

}


}
