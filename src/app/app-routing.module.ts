import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './views/hospital/hospital.component';
import { DepartmentComponent } from './views/department/department.component';


const routes: Routes = [
  {
    path: 'hospital',
    component: HospitalComponent
  },
  {
    path: '', redirectTo: 'hospital', pathMatch: 'full'
  },
  {
    path: 'department', component: DepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
