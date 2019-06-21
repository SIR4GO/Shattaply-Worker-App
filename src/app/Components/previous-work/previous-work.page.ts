import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides , AlertController , ModalController} from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PreviousWorkModelPage } from '../previous-work-model/previous-work-model.page';
import { PreviousWorkResponse } from 'src/app/Models/PreviousWorkResponse';
import { WorkerModel } from 'src/app/Models/WorkerModel';
import { PreviousWorkService } from 'src/app/Services/previous-work.service';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { Config } from 'src/app/config';



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

   config: Config = new Config();
   
   slideOpts = {
    initialSlide: 0,
    speed: 300,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  worker: WorkerModel = new WorkerModel();
  productionUrl  = 'http://192.168.1.3:80';
  removeIconFlag = true;



  constructor( private photoViewer: PhotoViewer , private alertController: AlertController ,
               private modelController: ModalController, private storage: Storage,
               private previousWorkService: PreviousWorkService , private router: Router )
  {
      this.productionUrl = this.config.hostAddress;
      
      // intialize
      this.previousWorks = [];
  }

  ngOnInit() {
    this.storage.get('workerInfo').then((info) => {
      this.worker = info;
      this.getPreviousWorks(this.worker.id);
   });
  }

  getPreviousWorks(id: string){
    this.previousWorkService.getPreviousWorks(id).subscribe((res) =>{ // call api
          this.previousWorks = res.data;
          this.editPreviousWorkImages(this.previousWorks);

          // console.log(this.previousWorks);
          this.removeIconFlag = true;

          // to solve error ionslidechange event
          if (this.previousWorks.length === 1) {
             this.id = this.previousWorks[0].previousWork_id;
             this.title = this.previousWorks[0].title;
             this.description = this.previousWorks[0].description;
          }
          else if (this.previousWorks.length === 0){ // in case zero previous works
            this.title = 'لا توجد اعمال سابقة';
            this.description = 'لا توجد اعمال سابقة';
            this.removeIconFlag = false;
           // console.log('here');
          }

          this.dataReceviedFlag = true;
          // console.log(res);
          // console.log(this.previousWorks);
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
          this.id = this.previousWorks[index].previousWork_id;
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

    modelRequest.onDidDismiss().then(() => {
          this.ngOnInit(); // to refresh component after accept or reject
    });

  }


  async presentAlertConfirm( prevId ) {
    const alert = await this.alertController.create({
      header: 'موافق!',
      message: 'هل تريد  <strong>مسح</strong> العمل',
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah ');
          }
        }, {
          text: 'موافق',
          handler: () => {
            console.log(prevId);
            this.previousWorkService.deletePreviousWork(prevId).subscribe((res) => {
                this.ngOnInit(); // refresh after delte
               // this.slides.startAutoplay();
                console.log(res);
            });
          }
        }
      ]
    });

    await alert.present();
  }






}
