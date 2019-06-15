import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-previous-work-model',
  templateUrl: './previous-work-model.page.html',
  styleUrls: ['./previous-work-model.page.scss'],
})
export class PreviousWorkModelPage implements OnInit {

  image = '../../assets/add-image.jpg';
  imageFlag = false;

  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }


  constructor(private modelController: ModalController , private camera: Camera) { }

  ngOnInit() {
  }

  hideAddModel() {
    this.modelController.dismiss();
  }

  getImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageFlag = true;
     }, (err) => {
      // Handle error
     });

  }

}
