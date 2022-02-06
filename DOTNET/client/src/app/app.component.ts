import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();

    // throw new Error('Method not implemented.');
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe((response) => {
      this.users = response;
      console.log(this.users);
    },error =>{
      console.log(error);

    });
  }
}
