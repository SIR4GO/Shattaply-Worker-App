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
  
   title: string;
   description: string;

   titles: string [] = ['title1' , 'title2' , 'title3'];
   descriptions: string[] = ['desc1' , 'desc2' , 'desc3' ];


  constructor( private photoViewer: PhotoViewer) { }

  slideOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  ngOnInit() {
  }
  getActiveIndex(){
      this.slides.getActiveIndex().then(index => {
          this.title = this.titles[index] ;
          this.description = this.descriptions[index];
      });
  }

  showImage(event) {
    const imgSrc = event.target.getAttribute('src');
    this.photoViewer.show(imgSrc, 'hello');
  }
}
