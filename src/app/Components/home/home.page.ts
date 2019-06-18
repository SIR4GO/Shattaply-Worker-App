import { Component } from '@angular/core';
import { BindDataService } from 'src/app/Services/bind-data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bindData: BindDataService , private storage: Storage) {
        this.storage.get('workerInfo').then((info) => {
          // console.log(info); to check data stored sucessfully
          this.bindData.emitChange(info); // send data to parent  (app-component) to render it in split menue duo to app-component already
       });
  }


}
