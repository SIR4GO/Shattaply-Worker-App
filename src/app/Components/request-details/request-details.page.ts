import { Component, OnInit, Input } from '@angular/core';
import { ModalController , NavParams , ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/Services/request.service';
import { WorkerModel } from 'src/app/Models/WorkerModel';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

  constructor(private model: ModalController , private nav: NavParams , public toastController: ToastController ,
              private requestService: RequestService) { }

  // data: any;

  @Input () data: any;
  @Input () worker: WorkerModel;
  condition = false;


  ngOnInit() {
    // const data = this.nav.get('data');
   // console.log( this.data.state.trim() === 'مؤجل');
    if ( this.data.state.trim() === 'منتظر للتأكيد' ) {
       this.condition = true;
    }
  }


  hideModel() {
       this.model.dismiss();
  }

  async  acceptRequest() {

    console.log(this.data.id , this.worker.id )
    this.requestService.acceptRequest(this.data.id , this.worker.id ).subscribe((res) => {

        console.log(res);
        this.model.dismiss('accept'); // send data back to request component
        this.showTostMessgae('تم الموافقة علي الطلب بنجاح')
    });

  }

  async showTostMessgae(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  rejectRequest() {

    console.log(this.data.id , this.worker.id )

    this.requestService.rejectRequest(this.data.id , this.worker.id ).subscribe((res) => {
        console.log(res);
        this.model.dismiss('accept'); // send data back to request component
        this.showTostMessgae('تم الرفض علي الطلب بنجاح')
    });
  }
}
