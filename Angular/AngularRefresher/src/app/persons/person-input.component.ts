import { Component,EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { PersonsService } from "./persons.service";
@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']


})

export class PersonInputComponent
{

  constructor(private prsService : PersonsService)
  {

  }
  enteredName ="";
  public addPerson()
  {
    console.log(this.enteredName + "Added");
    this.prsService.addPerson(this.enteredName);
    console.log(this.prsService.persons + "Added");

    this.enteredName ="";

  }
}
