import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../core/models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() public propertiesList: Breadcrumb[] = [];
  public isHover = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public navigate(url: any) {
    this.navigateToBack();
  }

  public onHover(event: any) {
    this.isHover = event;
  }


  public navigateToBack() {
    if (this.propertiesList.length > 1) {
      const path = this.propertiesList.slice(0, this.propertiesList.length - 1).map(item => {
        return item.url
      })
      let param = {}
      param['location'] = this.propertiesList[this.propertiesList.length - 2].location;
      param['branch'] = this.propertiesList[this.propertiesList.length - 2].branch;
      this.router.navigate(path, { queryParams: param })
    }
  }
}
