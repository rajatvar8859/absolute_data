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
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  public breadcumData = [
    { name: 'Department', url: '/', active: true, location: null, branch: null }];

  subscriptionList: Subscription[] = []
  dataSource
  displayedColumns
  hospitalEditFromFlag = false
  rowIndex = 0

  departmentForm: FormGroup = this.fb.group({
    departmentname: ["", [Validators.required]],
    head: ["", [Validators.required]],
    contactnumber: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    hospitalname: ["", [Validators.required]],
  });

  constructor(private service: HospitalService, private Router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  get departmentname() {
    return this.departmentForm.get("departmentname");
  }

  get head() {
    return this.departmentForm.get("head");
  }

  get hospitalname() {
    return this.departmentForm.get("hospitalname");
  }

  get contactnumber() {
    return this.departmentForm.get("contactnumber");
  }

  ngOnInit() {
    let sub1 = this.route.queryParams.subscribe((parameter: Params) => {
      let sub2 = this.service.getDepartmentList()
        .subscribe((res) => {
          this.dataSource = res
          this.dataSource = this.dataSource.filter(item => item['hospitalname'] == parameter.hospital)
          this.displayedColumns = Object.keys(res[0])
          this.displayedColumns = [...this.displayedColumns, 'Edit', 'Delete']
          this.dataSource.forEach(element => {
            element['editFlag'] = false
          });
        })
      this.subscriptionList.push(sub2)
    })

    this.subscriptionList.push(sub1)

  }

  public saveHospitalData() {
    this.dataSource[this.rowIndex]['departmentname'] = this.departmentForm.value.departmentname
    this.dataSource[this.rowIndex]['head'] = this.departmentForm.value.head
    this.dataSource[this.rowIndex]['hospitalname'] = this.departmentForm.value.hospitalname
    this.dataSource[this.rowIndex]['contactnumber'] = parseInt(this.departmentForm.value.contactnumber)
    this.dataSource[this.rowIndex]['editFlag'] = true
    this.departmentForm.reset()
  }

  public discard() {
    this.dataSource[this.rowIndex]['editFlag'] = false
    this.hospitalEditFromFlag = false
  }

  public editData(ind) {
    this.rowIndex = ind
    this.departmentForm.reset()
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

  goBack() {
    this.Router.navigate(['hospital']);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe()
    }
  }

}
