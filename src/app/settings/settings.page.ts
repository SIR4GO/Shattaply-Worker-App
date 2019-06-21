import { Component, OnInit } from '@angular/core';
import { BindDataService } from 'src/app/Services/bind-data.service';
import { Storage } from '@ionic/storage';
import { WorkerModel } from '../Models/WorkerModel';
import {Router} from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  worker: WorkerModel = new WorkerModel();

  constructor(private storage: Storage , private bindData: BindDataService , private router: Router ) { }

  ngOnInit() {
    this.storage.get('workerInfo').then((info) => {
      this.worker = info;
      this.bindData.emitChange(this.worker); // send worker to parent  (app-component) to render it in
                                             // split menue duo to app-component already
    });
  }


  clearSession(){
    this.storage.clear().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

}
