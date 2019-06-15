import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { RequestDetailsPage } from '../request-details/request-details.page';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor(public Mymodel: ModalController) { }

   requests: any = [
// tslint:disable-next-line: max-line-length
      {id: 1 , state: ' مؤجل' , title: 'سباكة' ,  address: 'الحسين شارع ابو سمير ' , description: ' شقة بها حمامين يتطلب عمل سباكة كا شقة بها حمامين يتطلب عمل سباكة كاملة '},
      {id: 2 , state: ' مؤجل' , title: 'محارة' ,  address: '3 شارع ابو حنفي' , description: 'شقة كاملة اي كلام وكل سنة وانتوا طيبين'},
      {id: 3 , state: ' مؤجل' , title: 'محارة' ,  address: '3 شارع ابو حنفي' , description: 'شقة كاملة اي كلام وكل سنة وانتوا طيبين'},
  ]

  ngOnInit() {
  }

  async show(request){

    // console.log(request);
    const modelRequest = await this.Mymodel.create({
      component: RequestDetailsPage,
      componentProps: { data: request } // send data  to request-details component
    });

    await modelRequest.present();

    modelRequest.onDidDismiss().then((data) =>{
        this.ngOnInit(); // to refresh component after accept or reject
    });
  }
}
