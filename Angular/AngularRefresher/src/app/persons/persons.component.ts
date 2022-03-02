import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PersonsService } from "./persons.service";
@Component({
  selector:'app-persons',
  templateUrl: 'persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy{

  constructor(private prsService : PersonsService)
{
}
  private personSub: Subscription = new Subscription;

ngOnInit(): void {
this.prsService.fetchPersons();
  this.prsService.personsChanged.subscribe(persons =>
  {
    this.personList = persons;
  })

}
public removePerson(name: string)
{
  this.prsService.removePerson(name);
}
personList! : string[];

ngOnDestroy(): void {

  this.personSub.unsubscribe();

}
}


