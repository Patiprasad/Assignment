import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {
  people$: Observable<Person[]> = this.peopleService.people$();

  constructor(private readonly peopleService: PeopleService) {}
}
