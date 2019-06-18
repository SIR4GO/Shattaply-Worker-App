import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides , AlertController , ModalController} from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PreviousWorkModelPage } from '../previous-work-model/previous-work-model.page';
import { PreviousWorkResponse } from 'src/app/Models/PreviousWorkResponse';
import { WorkerModel } from 'src/app/Models/WorkerModel';
import { PreviousWorkService } from 'src/app/Services/previous-work.service';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-previous-work',
  templateUrl: './previous-work.page.html',
  styleUrls: ['./previous-work.page.scss'],
})


export class PreviousWorkPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

   id;
   title = 'd';
   description = 'd';
   image: string;

   previousWorks: PreviousWorkResponse [] ;

   dataReceviedFlag = false;

   slideOpts = {
    initialSlide: 1,
    speed: 300,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  worker: WorkerModel = new WorkerModel();
  productionUrl  = 'http://192.168.1.3:80';



  constructor( private photoViewer: PhotoViewer , private alertController: AlertController ,
               private modelController: ModalController, private storage: Storage,  private previousWorkService: PreviousWorkService )
  {
      // intialize
      this.previousWorks = [];

      this.storage.get('workerInfo').then((info) => {
        this.worker = info;
        this.getPreviousWorks(this.worker.id)
     });
  }

  ngOnInit() {

  }

  getPreviousWorks(id: string){
    this.previousWorkService.getPreviousWorks(id).subscribe((res) =>{ // call api
          this.previousWorks = res.data;
          this.editPreviousWorkImages(this.previousWorks);
          this.dataReceviedFlag = true;
          // console.log(res);
          console.log(this.previousWorks);
    });
 }

 editPreviousWorkImages(prevWorks: PreviousWorkResponse []) {
       prevWorks.forEach((prevWork) => {
          const photoLink =  this.productionUrl + prevWork.image; // edit photo link to be suitable with app hosting
          prevWork.image = photoLink;
       });
 }
  getActiveIndex() {
      this.slides.getActiveIndex().then(index => {
          this.title = this.previousWorks[index].title ;
          this.description = this.previousWorks[index].description;
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
