import { AccountService } from './../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any={};
  // loggedIn: boolean=false;
  currentUser$ : Observable<User> | undefined;

  constructor(public accountService : AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.currentUser$ = this.accountService.currentUser$;
    console.log(this.accountService.currentUser$);
  }

  login(){

    this.accountService.login(this.model).subscribe(response =>
      {
           this.router.navigateByUrl("/lists");
           this.model = {};


      },error =>{
        console.log(error);
        this.toastr.error(error.error);
      });
  }

  logout()
  {
    // this.loggedIn =false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
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
