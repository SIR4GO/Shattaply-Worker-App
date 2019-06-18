import { Component, OnInit , ViewChild  } from '@angular/core';
import {IonSlides , AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import * as $ from 'jquery';
import {WorkerModel} from '../../Models/WorkerModel';
import {validate} from 'class-validator';
import {SignUpService} from '../../Services/sign-up.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit  {

  @ViewChild(IonSlides) slides: IonSlides;

  worker: WorkerModel;
  constructor(private camera: Camera , private alertController: AlertController ,
              private signUpService: SignUpService , private router: Router, private storage: Storage)
  {
     this.worker = new WorkerModel();
  }


  personalFlag = false;
  criminalFlag = false;
  creditFlag = false;

  passErrorFlag = false;
  phoneErrorFlag = false;
  requiredErrorFlag = false;
  photoErrorFlag = false;



  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  };

  slideOpts = {
    initialSlide: 0,
    speed: 600,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    zoom: false
  };

  ngOnInit() {
  }

  hideFlags(){
        this.passErrorFlag = false;
        this.requiredErrorFlag = false;
        this.phoneErrorFlag = false;
    }

  nextslideAndValidateData(){
      validate(this.worker).then(errors => { // errors is an array of validation errors
          if (errors.length > 0) {
              errors.forEach((error) => {
                   if(error.property.includes('password')){
                       this.passErrorFlag = true;
                   }
                    else if(error.property.includes('phone')){
                       this.phoneErrorFlag = true;
                    }
                    else{
                       this.requiredErrorFlag = true;
                    }
              });
              console.log('validation failed. errors: ', errors);
          } else {
              console.log('validation succeed for first slide');
              this.slides.slideNext();
          }
      });
  }



  storeWorker() {
      console.log('here');
      this.signUpService.addWorker(this.worker).subscribe((data) => {
          console.log(data);
      }, error1 => {
          console.log(error1);
      });
  }


  async submitData() {
    if (this.isValidImages()) {
        const alert = await this.alertController.create({
            header: 'موافق!',
            message: '   هل تريد تأكيد الطلب للالتحاق بشطبلي ؟ ',
            buttons: [
                {
                    text: 'الغاء',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'موافق',
                    handler: () => {
                        // call api
                        this.signUpService.addWorker(this.worker).subscribe((res) => {
                            this.worker.work = res.data.work;
                            this.worker.id  = res.data.id;
                            // console.log(this.worker);
                            // clear storage if he will sign up by new account
                            this.storage.clear().then(() => {
                               this.storage.set('workerInfo' , this.worker);
                               this.router.navigate(['/home']);
                            });
                        }, error1 => {
                            console.log(error1);
                        });
                    }
                }
            ]
        });

        await alert.present();

    } else {
        this.photoErrorFlag = true;
        console.log('validation for images failed')
    }
  }

  isValidImages(): boolean{
     return this.worker.fish_tashbih.length !== 0 && this.worker.national_card.length !== 0 && this.worker.Image.length !== 0;
  }

  previouslide(){
    this.slides.slidePrev();
  }

  getPersonalImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.worker.Image = 'data:image/jpeg;base64,' + imageData;
      this.personalFlag = true;
     }, (err) => {
      // Handle error
     });
  }

  getPersonalCreditImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.worker.national_card = 'data:image/jpeg;base64,' + imageData;
      this.creditFlag = true;
     }, (err) => {
      // Handle error
     });
  }

  getCriminalImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.worker.fish_tashbih = 'data:image/jpeg;base64,' + imageData;
      this.criminalFlag = true;
     }, (err) => {
      // Handle error
     });
  }

}

