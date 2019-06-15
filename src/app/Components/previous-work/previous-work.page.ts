import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides , AlertController , ModalController} from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PreviousWorkModelPage } from '../previous-work-model/previous-work-model.page';



@Component({
  selector: 'app-previous-work',
  templateUrl: './previous-work.page.html',
  styleUrls: ['./previous-work.page.scss'],
})


export class PreviousWorkPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

   id;
   title: string;
   description: string;
   image: string;

   // lists
   ids;
   titles: string [] = ['title1' , 'title2' , 'title3'];
   descriptions: string[] = ['Lorem Ipsum is simply dummy inting and typesetting' , 'desc2' , 'desc3' ];
   images: string;


   slideOpts = {
    initialSlide: 1,
    speed: 300,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };


  constructor( private photoViewer: PhotoViewer , private alertController: AlertController , private modelController: ModalController ) { }

  ngOnInit() {

  }
  getActiveIndex() {
      this.slides.getActiveIndex().then(index => {
          this.title = this.titles[index] ;
          this.description = this.descriptions[index];
      });
  }

  showImage(event) {
      const imgSrc = event.target.getAttribute('src');
      this.photoViewer.show(imgSrc, 'hello');
  }


  async showAddModel() {
    const modelRequest = await this.modelController.create({
      component: PreviousWorkModelPage,
      componentProps: {} // send data  to request-details component
    });
    await modelRequest.present();

  }




  async presentAlertConfirm( type = 'aa') {
    const alert = await this.alertController.create({
      header: 'موافق!',
      message: 'هل تريد  <strong>مسح</strong> العمل',
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah ' + type);
          }
        }, {
          text: 'موافق',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }



}
