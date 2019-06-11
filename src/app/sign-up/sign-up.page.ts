import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor() { }

  slideOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  ngOnInit() {
  }

}
