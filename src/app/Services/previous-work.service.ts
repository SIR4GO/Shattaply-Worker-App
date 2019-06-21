import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { PreviousWorkModel } from '../Models/PreviousWorkModel';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PreviousWorkService {


  config: Config = new Config();


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
      return this.httpClient.post(this.config.hostAddress + '/api/storePreviousWork' , previousWork , this.httpOptions);
  }

  getPreviousWorks(id: string): Observable<any>{
     return this.httpClient.get(this.config.hostAddress + '/api/showPreviousWork', {params: { worker_id: id }});
  }

  deletePreviousWork(id: any): Observable<any>{
    return this.httpClient.delete(this.config.hostAddress + `/api/deletePreviousWork/${id}`);
  }
}
