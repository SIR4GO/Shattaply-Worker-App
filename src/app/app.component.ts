import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BindDataService } from './Services/bind-data.service';
import { WorkerModel } from './Models/WorkerModel';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent  {
  public appPages = [
    {
      title: 'الرائيسية',
      url: '/home',
      icon: 'home'
    },
    {
      title: ' الطلبات ',
      url: '/request',
      icon: 'build'
    }
    ,
    {
      title: ' من نحن',
      url: '/list',
      icon: 'md-contacts'
    }
    ,
    {
      title: ' سياسة الاستخدام',
      url: '/list',
      icon: 'bulb'
    },
    {
      title: 'الأعدادت',
      url: '/list',
      icon: 'cog'
    }
  ];



  worker: WorkerModel;
  productionUrl = 'http://192.168.1.3:80';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private bindData: BindDataService
  ) {

    this.worker = new WorkerModel();

    this.initializeApp();
    // get data from child component to use it in app component (parent of router-outlet)
    this.bindData.changeEmitted$.subscribe((WorkerInfo) => {
          this.worker = WorkerInfo;
     //     console.log(this.worker);
     });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
