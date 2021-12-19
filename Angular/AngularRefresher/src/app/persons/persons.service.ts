import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject,map } from "rxjs";

@Injectable({providedIn: 'root'})
export class PersonsService {
  constructor(private http: HttpClient) { }
//Subjects
  public  persons = ["Max", "Manuel", "Anna"];
  // The code below is used to give live updates after a change is made to the list.
  personsChanged = new Subject<string[]>();

  public addPerson(name: string)
  {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }
public removePerson(name: string)
{
  this.persons =this.persons.filter(persons =>{
    return persons !==name;
  });
  this.personsChanged.next(this.persons);
}

public fetchPersons()
{
  this.http.get<any>('https://swapi.co/api/people/').subscribe(x=> {
    console.log(x);
  })
}
}
