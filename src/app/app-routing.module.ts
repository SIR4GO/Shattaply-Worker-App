import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  { path: 'previous-work',
    loadChildren: './previous-work/previous-work.module#PreviousWorkPageModule'
  }
  ,
  { path: 'request',
    loadChildren: './request/request.module#RequestPageModule'
  },
  { path: 'request-details', loadChildren: './request-details/request-details.module#RequestDetailsPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'previous-work-model', loadChildren: './previous-work-model/previous-work-model.module#PreviousWorkModelPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
