import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SessionService} from '../../services/session.service';

@Component({
  selector: 'mahrio-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() entity;
  public url;
  public entities;
  constructor(private route: ActivatedRoute, private session: SessionService) {
    this.entities = this.session.env['c']['asset'][0];
    this.entity = {};
  }

  ngOnInit() {
    this.url = this.route.snapshot.url;
    if (this.url.length > 1 && this.url[1].path === 'profile') {
      this.entities = 'Profile';
    }
    if (this.url.length > 1 && this.url[1].path === 'courses') {
      this.entities = 'Courses';
    }
  }
  get isDashboard() {
    return this.url.length === 1 && this.url[0].path === 'dashboard';
  }
  get isEntity() {
    return this.url.length === 2 && this.url[1].path === this.entities.toLowerCase();
  }
  get isAction() {
    return this.url.length > 2;
  }
  get action() {
    switch( this.url.length ) {
      case 4:
        return this.entity ? this.entity.title : '';
      default:
        const t = this.entities === 'Courses' ? 'Course' : this.session.env['c']['asset'][1];
        return 'New ' + t;
    }
  }

}
