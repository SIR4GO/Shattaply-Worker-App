import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreviousWorkModelPage } from './previous-work-model.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousWorkModelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreviousWorkModelPage]
})
export class PreviousWorkModelPageModule {}
