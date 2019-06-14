import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as $ from 'jquery';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit  {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private camera: Camera) { }

  personalIamge = 'http://chittagongit.com/download/260102';
  criminalImage = 'http://chittagongit.com/download/260102';
  personalCreditImage = 'http://chittagongit.com/download/260102';

  personalFlag = false;
  criminalFlag = false;
  creditFlag = false;

  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }

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

  nextslide(){
     this.slides.slideNext();
  }

  previouslide(){
    this.slides.slidePrev();
  }

  getPersonalImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.personalIamge = 'data:image/jpeg;base64,' + imageData;
      this.personalFlag = true;
     }, (err) => {
      // Handle error
     });
  }

  getPersonalCreditImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.personalCreditImage = 'data:image/jpeg;base64,' + imageData;
      this.creditFlag = true;
     }, (err) => {
      // Handle error
     });
  }

  getCriminalImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.criminalImage = 'data:image/jpeg;base64,' + imageData;
      this.criminalFlag = true;
     }, (err) => {
      // Handle error
     });
  }

}

