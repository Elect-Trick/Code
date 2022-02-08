import { GuardAuthGuard } from './guards/guard-auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [

  {path:'', component:HomeComponent,canActivate:[GuardAuthGuard]},
  {path:'',runGuardsAndResolvers:'always',canActivate:[GuardAuthGuard],children:[
    {path:'members', component:MemberListComponent},
    {path:'members/:id', component:MemberDetailComponent},
    {path:'lists', component:ListsComponent, },
    {path:'messages', component:MessagesComponent}
  ]}
  ,
  // Wildcard route, when a user enters a non existant resource
  {path:'**', component:MessagesComponent, pathMatch:'full'}

  //The line underneath marks all the routes specified in the
  //
  // {path:'',runGuardsAndResolvers:'always', canActivate:[GuardAuthGuard],children:




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
