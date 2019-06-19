import { Component, OnInit } from '@angular/core';
import { WorkerModel } from '../Models/WorkerModel';
import { SignInService } from '../Services/sign-in.service';
import { Storage } from '@ionic/storage';
import {validate} from 'class-validator';
import {Router} from '@angular/router';
import { SigInRequestModel } from '../Models/SigInRequestModel';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(private signInWorkerService: SignInService , private router: Router, private storage: Storage) { }

  worker: WorkerModel = new WorkerModel();

  signInRequestModel: SigInRequestModel = new SigInRequestModel();



  ngOnInit() {

  }

  LogInWorker() {

    validate(this.signInRequestModel).then(errors => { // errors is an array of validation errors
      if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
      } else {
          console.log('validation succeed for first slide');
          this.signInWorkerService.signInWorker(this.signInRequestModel).subscribe((res) => {
            console.log(res);
            this.worker.id = res.data.id;
            this.worker.name = res.data.full_name;
            this.worker.age = res.data.age;
            this.worker.password = res.data.password;
            this.worker.work    = res.data.work;
            this.worker.phone = res.data.phone;
            this.worker.city = res.data.city;
            this.worker.region = res.data.region;
            this.worker.total_rate =  res.data.total_rate;
            this.worker.image = res.data.image;

            this.storage.clear().then(() => {
              this.storage.set('workerInfo' , this.worker);
              this.router.navigate(['/home']);
            });

          });
     }});
  }

}
