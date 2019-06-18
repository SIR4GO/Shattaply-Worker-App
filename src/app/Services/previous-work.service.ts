import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { PreviousWorkModel } from '../Models/PreviousWorkModel';

@Injectable({
  providedIn: 'root'
})
export class PreviousWorkService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',

    })
};

developmentUrl = 'http://shataply/api/storePreviousWork';
productionUrl  = 'http://192.168.1.3:80';

constructor(private httpClient: HttpClient) { }


  addPreviousWork(previousWork: PreviousWorkModel): Observable<any>
  {
      return this.httpClient.post(this.productionUrl + '/api/storePreviousWork' , previousWork , this.httpOptions);
  }

  getPreviousWorks(id: string): Observable<any>{
     return this.httpClient.get(this.productionUrl+ '/api/showPreviousWork', {params: { worker_id: id }});
  }
}
