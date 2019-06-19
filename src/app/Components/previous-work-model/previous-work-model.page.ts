import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PreviousWorkModel } from 'src/app/Models/PreviousWorkModel';
import {validate} from 'class-validator';
import { Storage } from '@ionic/storage';
import { WorkerModel } from 'src/app/Models/WorkerModel';
import { PreviousWorkService } from 'src/app/Services/previous-work.service';

@Component({
  selector: 'app-previous-work-model',
  templateUrl: './previous-work-model.page.html',
  styleUrls: ['./previous-work-model.page.scss'],
})
export class PreviousWorkModelPage implements OnInit {

  image = '../../assets/add-image.jpg';
  imageFlag = false;
  requiredErrorFlag = false;

  previousWork: PreviousWorkModel = new PreviousWorkModel() ;
// tslint:disable-next-line: new-parens
  worker: WorkerModel = new  WorkerModel();


  options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }


  constructor(private modelController: ModalController , private camera: Camera , private storage: Storage ,
              private previousWorkService: PreviousWorkService) {}

  ngOnInit() {
    this.storage.get('workerInfo').then((info) => {
      this.worker = info;
      this.previousWork.worker_id = this.worker.id;
   });

 }

  hideAddModel() {
    this.modelController.dismiss();
  }

  getImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageFlag = true;
      this.previousWork.image = this.image; // assign image here
      //console.log(this.image);
     }, (err) => {
      // Handle error
     });

  }

  addPreviousWork() {
    validate(this.previousWork).then(errors => { // errors is an array of validation errors
      if (errors.length > 0) {
          // show message error
          this.requiredErrorFlag = true;
          console.log('validation failed. errors: ', errors);
      } else {
          // call api
            console.log('validation succeed for first slide');
           // console.log(this.previousWork);
            this.previousWorkService.addPreviousWork(this.previousWork).subscribe((res) =>{
                 console.log(res);
                 this.modelController.dismiss();
            }, error => {
               console.log(error);
            });
      }
  });
  }



}
