import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  public getHospitalList() {
    return this.http.get('../../../assets/data/hospital.json').pipe(
      pluck('hospitals')
    )
  }

  public getDepartmentList() {
    return this.http.get('../../../assets/data/departments.json').pipe(
      pluck('departments')
    )
  }
}
