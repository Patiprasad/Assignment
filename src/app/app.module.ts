import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleDeleteComponent } from './people/people-delete/people-delete.component';
import { PeopleCreateComponent } from './people/people-create/people-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PeopleEditComponent,
    PeopleDeleteComponent,
    PeopleCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
