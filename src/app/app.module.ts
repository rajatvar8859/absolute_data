import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './views/shared/breadcrumb/breadcrumb.component';
import { HospitalComponent } from './views/hospital/hospital.component';
import { DepartmentComponent } from './views/department/department.component';
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HospitalComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [MatMenuModule, MatButtonModule, MatCardModule, FormsModule,MatSortModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
