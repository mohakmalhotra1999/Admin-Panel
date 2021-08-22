import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login2Component } from './auth/login2/login2.component';
import { Signup2Component } from './auth/signup2/signup2.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ResetComponent } from './auth/reset/reset.component';
import { MainComponent } from './main/main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ListNftComponent } from './main/list-nft/list-nft.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login2', pathMatch: 'full' },
  {path:'login2',component:Login2Component,canActivate:[AuthGuard]},
  {path:'forgot',component:ForgotComponent},
  {path:'signup2',component:Signup2Component},
  {path:'reset',component:ResetComponent},
  {path:'main',component:MainComponent,children:[
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'list-nft',component:ListNftComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
