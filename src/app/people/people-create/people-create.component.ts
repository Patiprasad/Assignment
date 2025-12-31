import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-create',
  templateUrl: './people-create.component.html',
  styleUrls: ['./people-create.component.css']
})
export class PeopleCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.peopleService.create(this.form.value);
    this.router.navigate(['/people']);
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }
}
