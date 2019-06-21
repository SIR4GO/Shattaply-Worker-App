import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Storage } from '@ionic/storage';
import { WorkerModel } from '../Models/WorkerModel';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate{


  currentWorker: WorkerModel = new WorkerModel();

  constructor(private router: Router , private storage: Storage ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return this.storage.get('workerInfo').then((worker) => {
        this.currentWorker = worker;
        if (this.currentWorker !== null) {
           // console.log(this.currentWorker);
            return true;
        } else {
            this.router.navigate(['/sign-in']);
            console.log('sign-in please');
            return false;
        }

   });


  }
}
