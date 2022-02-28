import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './../../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
baseUrl = environment.apiUrl;
validationErrors:  string[] =[];
  constructor(private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
  }

  getNotFoundError(){
    // Error 404
    this.http.get(this.baseUrl + 'errorhandler/not-found').subscribe(response=>{
      this.router.navigateByUrl('');
      console.log(response);

    },error =>{
      console.log(error);
    });
  } getUnAuthorizedError(){
    // Error 401
    this.http.get(this.baseUrl + 'errorhandler/auth').subscribe(response=>{
      console.log(response);

    },error =>{
      console.log(error);
    });
  }
   getBadRequestError(){
    //  Error 400
    this.http.get(this.baseUrl + 'errorhandler/bad-request').subscribe(response=>{
      console.log(response);

    },error =>{
      console.log(error);
    });
  }

  getInternalServerError(){
    // Error 500
    this.http.get(this.baseUrl + 'errorhandler/server-error').subscribe(response=>{
      console.log(response);

    },error =>{
      console.log(error);
    });
  }

  getValidationError(){
    // Error 400
    this.http.post(this.baseUrl + 'account/register',{}).subscribe(response=>{
      console.log(response);

    },error =>{
      console.log(error);
      this.validationErrors = error;

    });
  }

}
