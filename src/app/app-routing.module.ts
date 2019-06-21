import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateService } from './Services/can-activate.service';
// by using PreloadAllModules , you don't need import module
const routes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      loadChildren: './Components/home/home.module#HomePageModule',
      canActivate: [CanActivateService]
  },
  {
      path: 'profile',
      loadChildren: './Components/profile/profile.module#ProfilePageModule',
      canActivate: [CanActivateService]
  },
  {
      path: 'previous-work',
      loadChildren: './Components/previous-work/previous-work.module#PreviousWorkPageModule',
      canActivate: [CanActivateService]
  }
  ,
  {
      path: 'request',
      loadChildren: './Components/request/request.module#RequestPageModule',
      canActivate: [CanActivateService]
  },
  {
      path: 'request-details',
      loadChildren: './Components/request-details/request-details.module#RequestDetailsPageModule',
      canActivate: [CanActivateService]
  },
  {
      path: 'sign-up',
      loadChildren: './Components/sign-up/sign-up.module#SignUpPageModule',
  },
  {
      path: 'previous-work-model',
      loadChildren: './Components/previous-work-model/previous-work-model.module#PreviousWorkModelPageModule',
      canActivate: [CanActivateService]
  },
  {
    path: 'sign-in',
    loadChildren: './sign-in/sign-in.module#SignInPageModule',
  },
  {
     path: 'settings',
     loadChildren: './settings/settings.module#SettingsPageModule',
     canActivate: [CanActivateService]

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
