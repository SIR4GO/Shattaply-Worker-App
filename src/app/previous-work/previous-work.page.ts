import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';



@Component({
  selector: 'app-previous-work',
  templateUrl: './previous-work.page.html',
  styleUrls: ['./previous-work.page.scss'],
})


export class PreviousWorkPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor( private photoViewer: PhotoViewer) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  ngOnInit() {
  }
  getActiveIndex(){
      this.slides.getActiveIndex().then(value => {
          console.log(value);
      });
  }

  showImage(img: HTMLElement) {
    const imgSrc = img.getAttribute('src');
    this.photoViewer.show(imgSrc, 'hello');
  }
}
