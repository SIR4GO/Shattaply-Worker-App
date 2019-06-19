import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WorkerModel } from 'src/app/Models/WorkerModel';
import { BindDataService } from 'src/app/Services/bind-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  worker: WorkerModel;
  productionUrl = 'http://192.168.1.3:80';

  constructor(private storage: Storage ,private bindData: BindDataService) {

    this.worker = new WorkerModel();
    this.storage.get('workerInfo').then((info) => {
        this.worker = info;
    });

    this.storage.get('workerInfo').then((info) => {
      // console.log(info); to check data stored sucessfully
      this.bindData.emitChange(info); // send data to parent  (app-component) to render it in split menue duo to app-component already
    });

  }

  ngOnInit() {
  }

}
