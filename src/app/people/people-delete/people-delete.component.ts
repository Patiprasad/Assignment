import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-delete',
  templateUrl: './people-delete.component.html',
  styleUrls: ['./people-delete.component.css']
})
export class PeopleDeleteComponent implements OnInit {
  person?: Person;
  notFound = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly peopleService: PeopleService
  ) {}

  ngOnInit() {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);
    if (!rawId || Number.isNaN(id)) {
      this.notFound = true;
      return;
    }

    const person = this.peopleService.getById(id);
    if (!person) {
      this.notFound = true;
      return;
    }

    this.person = person;
  }

  confirmDelete(): void {
    if (!this.person) {
      return;
    }
    this.peopleService.delete(this.person.id);
    this.router.navigate(['/people']);
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }

}
