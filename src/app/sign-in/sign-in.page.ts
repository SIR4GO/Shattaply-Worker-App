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
          });
     }});
  }

}
