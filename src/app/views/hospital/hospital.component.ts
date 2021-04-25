import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../core/services/hospital.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit, OnDestroy {

  public breadcumData = [
    { name: 'Hospital', url: '/', active: true, location: null, branch: null }];

  subscriptionList: Subscription[] = []
  dataSource
  displayedColumns
  hospitalEditFromFlag = false
  rowIndex = 0

  hospitalForm: FormGroup = this.fb.group({
    hospitalname: ["", [Validators.required]],
    contactnumber: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  });

  constructor(private service: HospitalService, private Router: Router, private fb: FormBuilder) { }

  get hospitalname() {
    return this.hospitalForm.get("hospitalname");
  }

  get contactnumber() {
    return this.hospitalForm.get("contactnumber");
  }

  ngOnInit() {

    let sub1 = this.service.getHospitalList()
      .subscribe((res) => {
        this.dataSource = res
        this.displayedColumns = Object.keys(res[0])
        this.displayedColumns = [...this.displayedColumns, 'View', 'Edit', 'Delete']
        this.dataSource.forEach(element => {
          element['editFlag'] = false
        });
      })

    this.subscriptionList.push(sub1)
  }

  public saveHospitalData() {
    this.dataSource[this.rowIndex]['hospitalname'] = this.hospitalForm.value.hospitalname
    this.dataSource[this.rowIndex]['contactnumber'] = parseInt(this.hospitalForm.value.contactnumber)
    this.dataSource[this.rowIndex]['editFlag'] = true
    this.hospitalForm.reset()
  }

  public discard() {
    this.hospitalForm.reset()
    this.dataSource[this.rowIndex]['editFlag'] = false
    this.hospitalEditFromFlag = false
  }

  public editData(ind) {
    this.rowIndex = ind
    this.hospitalForm.reset()
    this.dataSource.forEach((element, index) => {
      if (index == ind) {
        element['editFlag'] = !element['editFlag']
        this.hospitalEditFromFlag = element['editFlag']
      } else {
        element['editFlag'] = false
      }
    });
  }

  public sortData() {
    let temp = JSON.parse(JSON.stringify(this.dataSource))
    this.dataSource = []
    temp.sort((a, b) => {
      return -1
    })
    this.dataSource = temp
  }

  public deleteData(ind) {
    this.dataSource = this.dataSource.filter((value, index, arr) => {
      if (ind != index) return value
    });
  }

  public navigateTo(ind) {
    this.Router.navigate(['department'], { queryParams: { 'hospital': this.dataSource[ind]['hospitalname'] } });
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe()
    }
  }
}
