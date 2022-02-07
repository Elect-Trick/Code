import { AccountService } from './../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any={};
  // loggedIn: boolean=false;
  currentUser$ : Observable<User> | undefined;

  constructor(public accountService : AccountService) { }

  ngOnInit(): void {

    this.currentUser$ = this.accountService.currentUser$;
    console.log(this.accountService.currentUser$);
  }

  login(){

    this.accountService.login(this.model).subscribe(response =>
      {
        console.log(this.accountService.currentUser$);
        // this.loggedIn = true;


      },error =>{
        console.log(error);
      });
  }

  logout()
  {
    // this.loggedIn =false;
    this.accountService.logout();
  }

  // getCurrentUser()
  // {
  //   this.accountService.currentUser$.subscribe(user =>
  //     {
  //       this.loggedIn = !!user;
  //     }, error=>{
  //       console.log(error);
  //     });
  // }

}
