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
  rateBtnsFlag = false;
  rateTypeFlag = false;

  ngOnInit() {
    // const data = this.nav.get('data');

    // show rate option during load
    if ( this.data.state.trim() === 'منتظر للتأكيد' ) {
       this.condition = true;
    } // show rate buttons if request accepted and not rated yet
    else if ( this.data.state.trim() === 'تم الموافقة عليه' && this.data.request_rate === null){
         this.rateBtnsFlag = true;
    }
    else if( this.data.request_rate === 'ايجابي' || this.data.request_rate === 'سلبي') {
        this.rateBtnsFlag = false;
        this.rateTypeFlag = true;
    }


  }


  hideModel() {
       this.model.dismiss();
  }

  async  acceptRequest() {

    console.log(this.data.id , this.worker.id )
    this.requestService.acceptRequest(this.data.id , this.worker.id ).subscribe((res) => {

        console.log(res);
        this.rateBtnsFlag = true; // to show rate buttons after accepting

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

  ratePostive() {
    // change  data static in ui
     this.data.total_rate += 0.1;
     this.data.request_rate = 'ايجابي';
     this.data.total_rate  = parseFloat(this.data.total_rate ).toFixed(1);
     this.rateTypeFlag = true;
     this.ngOnInit();

    // change data in  backend
     this.requestService.rateAcceptedRequest(this.data.id , 'ايجابي').subscribe((res) => {
          console.log(res);
     });
     this.requestService.rateUser(this.data.user_id, 0.1).subscribe((res) =>{
         console.log(res);
     });

  }

  rateNegative() {
    // change static data
    this.data.total_rate -= 0.1;
    this.data.request_rate = 'سلبي';
    this.data.total_rate  = parseFloat(this.data.total_rate ).toFixed(1);
    this.rateTypeFlag = true;
    this.ngOnInit();

    // change data in  backend
    this.requestService.rateAcceptedRequest(this.data.id , 'سلبي').subscribe((res) => {
        console.log(res);
    });
    this.requestService.rateUser(this.data.user_id, -0.1).subscribe((res) => {
      console.log(res);
    });

  }
}
