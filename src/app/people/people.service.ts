import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly storageKey = 'people-spa.people.v1';
  private readonly peopleSubject = new BehaviorSubject<Person[]>(this.loadInitial());

  constructor() { }

  people$(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  getById(id: number): Person | undefined {
    return this.peopleSubject.value.find(p => p.id === id);
  }

  create(person: Omit<Person, 'id'>): void {
    const people = this.peopleSubject.value;
    const maxId = people.reduce((max, p) => Math.max(max, p.id), 0);
    const newPerson: Person = { id: maxId + 1, ...person };
    this.persist([...people, newPerson]);
  }

  update(updated: Person): void {
    const next = this.peopleSubject.value.map(p => (p.id === updated.id ? { ...updated } : p));
    this.persist(next);
  }

  delete(id: number): void {
    const next = this.peopleSubject.value.filter(p => p.id !== id);
    this.persist(next);
  }

  private persist(people: Person[]): void {
    this.peopleSubject.next(people);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(people));
    } catch {
    }
  }

  private loadInitial(): Person[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Person[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
    }

    return [
      { id: 1, firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' },
      { id: 2, firstName: 'Alan', lastName: 'Turing', email: 'alan@example.com' },
      { id: 3, firstName: 'Grace', lastName: 'Hopper', email: 'grace@example.com' }
    ];
  }
}
