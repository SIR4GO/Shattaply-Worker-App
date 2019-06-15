import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// by using PreloadAllModules , you don't need import module
const routes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      loadChildren: './Components/home/home.module#HomePageModule'
  },
  {
      path: 'profile',
      loadChildren: './Components/profile/profile.module#ProfilePageModule'
  },
  {
      path: 'previous-work',
      loadChildren: './Components/previous-work/previous-work.module#PreviousWorkPageModule'
  }
  ,
  {
      path: 'request',
      loadChildren: './Components/request/request.module#RequestPageModule'
  },
  {
      path: 'request-details',
      loadChildren: './Components/request-details/request-details.module#RequestDetailsPageModule'
  },
  {
      path: 'sign-up',
      loadChildren: './Components/sign-up/sign-up.module#SignUpPageModule'
  },
  {
      path: 'previous-work-model',
      loadChildren: './Components/previous-work-model/previous-work-model.module#PreviousWorkModelPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
