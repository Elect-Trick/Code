import { Component,EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']


})

export class PersonInputComponent
{
  @Output() addedPerson= new EventEmitter<string>();
  enteredName ="";
  public addPerson()
  {
    console.log(this.enteredName + "Added");
    this.addedPerson.emit(this.enteredName);
    this.enteredName ="";

  }
}
