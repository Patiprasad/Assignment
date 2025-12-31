import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit {
  form!: FormGroup;
  person?: Person;
  notFound = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
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
    this.form = this.fb.group({
      firstName: [person.firstName, [Validators.required]],
      lastName: [person.lastName, [Validators.required]],
      email: [person.email, [Validators.required, Validators.email]]
    });
  }

  save(): void {
    if (!this.person) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.peopleService.update({
      ...this.person,
      ...this.form.value
    });
    this.router.navigate(['/people']);
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }

}
