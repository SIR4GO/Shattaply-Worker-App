import { Component, OnInit, Input } from '@angular/core';
import { ModalController , NavParams , ToastController } from '@ionic/angular';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

  constructor(private model: ModalController , private nav: NavParams , public toastController: ToastController) { }

  // data: any;

  @Input () data: any;

  condition = false;
  ngOnInit() {
    // const data = this.nav.get('data');
   // console.log( this.data.state.trim() === 'مؤجل');
    if ( this.data.state.trim() === 'مؤجل' ) {
       this.condition = true;
    }
  }


  hideModel() {
       this.model.dismiss();
  }

  async  showAcceptMessage() {
    const toast = await this.toastController.create({
      message: 'تم الموافقة علي الطلب بنجاح',
      duration: 3000
    });
    toast.present();

    this.model.dismiss('done'); // send data back to request component
  }

  async  showRejectMessage() {
    const toast = await this.toastController.create({
      message: 'تم رفض الطلب بنجاح',
      duration: 3000
    });
    toast.present();

    this.model.dismiss('done'); // send data back to request component
  }
}
