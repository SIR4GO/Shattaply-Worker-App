import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// native plugin
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { RequestDetailsPageModule } from './Components/request-details/request-details.module';
import { PreviousWorkModelPageModule } from './Components/previous-work-model/previous-work-model.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RequestDetailsPageModule, // to using model with request and reauest-details
    PreviousWorkModelPageModule,  // to using model with prevoius-work and previous-work-model
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer, // to use native plugins
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
