import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import { RequestDetailsPage } from '../request-details/request-details.page';
import { BindDataService } from 'src/app/Services/bind-data.service';
import { Storage } from '@ionic/storage';
import { RequestModel } from 'src/app/Models/RequestModel';
import { RequestService } from 'src/app/Services/request.service';
import { WorkerModel } from 'src/app/Models/WorkerModel';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  worker: WorkerModel = new WorkerModel();
  requests: RequestModel [] = [];
  bandFlag = false;
  emptyRequestsFlag = false;

  constructor(public Mymodel: ModalController, private bindData: BindDataService , private storage: Storage,
              private requestService: RequestService , public alertController: AlertController){}


  ngOnInit() {

    this.storage.get('workerInfo').then((info) => {
      this.worker = info;
      this.bindData.emitChange(this.worker); // send worker to parent  (app-component) to render it in
                                             // split menue duo to app-component already
      this.requestService.getRequests(this.worker.id).subscribe((res) => {

          if ( res.message === 'successfull') { // render data if worker not blocked

                this.bandFlag = false;

                if (res.data.length !== 0) {

                  this.emptyRequestsFlag = false;
                  this.requests = res.data;
                  this.editRequestState(this.requests);

                } else {
                    this.emptyRequestsFlag = true;
                }
               // console.log(this.requests);
          }
          else {
                 this.bandFlag = true;
                 this.presentAlert();
          }

      }, (err) => {
         console.log(err);
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'رسالة',
      subHeader: 'محظور',
      message: 'انت محظور حاليا يرجي التواصل مع الادمن لفك الحظر',
      buttons: ['ازالة']
    });
    await alert.present();
  }


  editRequestState(requests: RequestModel [] ) {
     requests.forEach((req) => {
          if(req.state === 'avaliable'){
             req.state = 'منتظر للتأكيد';
          } else if (req.state === 'accepted') {
              req.state = 'تم الموافقة عليه';
          }
     });
  }

  async show(request){

    // console.log(request);
    const modelRequest = await this.Mymodel.create({
      component: RequestDetailsPage,
      componentProps: { data: request , worker: this.worker} // send data  to request-details component
    });

    await modelRequest.present();

    modelRequest.onDidDismiss().then((data) => {

        this.ngOnInit(); // to refresh component after accept or reject
    });
  }
}
