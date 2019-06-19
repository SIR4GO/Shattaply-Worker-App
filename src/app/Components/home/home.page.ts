import { Component } from '@angular/core';
import { BindDataService } from 'src/app/Services/bind-data.service';
import { Storage } from '@ionic/storage';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  newRequestsCount: any;


  constructor(private bindData: BindDataService , private storage: Storage , private requestService: RequestService) {
        this.storage.get('workerInfo').then((worker) => {
            // console.log(info); to check data stored sucessfully
          this.bindData.emitChange(worker); // send data to parent  (app-component) to render it in split menue duo to app-component already

          this.requestService.countAvaliableRequests(worker.id).subscribe((res) => {
               this.newRequestsCount = res.data.length;
          }, (err) => console.log(err));
        });
  }


}
