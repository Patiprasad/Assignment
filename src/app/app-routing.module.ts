import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleCreateComponent } from './people/people-create/people-create.component';
import { PeopleDeleteComponent } from './people/people-delete/people-delete.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleListComponent } from './people/people-list/people-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'people' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PeopleCreateComponent },
  { path: 'people/:id/edit', component: PeopleEditComponent },
  { path: 'people/:id/delete', component: PeopleDeleteComponent },
  { path: '**', redirectTo: 'people' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
