import { NgModule} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { ValidSessionGuard } from '@mahrio/shared';
import * as env from '../environments/environment';
const ent = env.environment['asset'][0].toLowerCase();

import { EntityListComponent } from './pages/entity-list/entity-list.component';
import { EntityCreateComponent } from './pages/entity-create/entity-create.component';
import { EntityEditComponent } from './pages/entity-edit/entity-edit.component';

import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';

const routes: Routes = [
  {path: `dashboard/tutorials/:id/:edit`, component: EntityEditComponent, canActivate: [ ValidSessionGuard ]},
  {path: `dashboard/tutorials/:id/dx/:edit`, component: EntityEditComponent,  data: {dx: true}, canActivate: [ ValidSessionGuard ]},
  {path: `dashboard/tutorials/new`, component: EntityCreateComponent, canActivate: [ ValidSessionGuard ]},
  {path: `dashboard/tutorials`, component: EntityListComponent, canActivate: [ ValidSessionGuard ]},        // LIST OF OWNERSHIP (AUTHORIZED / SELF ROLE)
  {path: `dashboard/admin/:type`, component: EntityListComponent, canActivate: [ ValidSessionGuard ]},  // LIST OF ALL (INSTRUCTOR ROLE)
  {path: `dashboard/dx/:type`, component: EntityListComponent, canActivate: [ ValidSessionGuard ]},    // LIST OF ALL IN USE CASE REVIEW (REVIEWER/INSTRUCTOR ROLE)
  {path: `dashboard/courses`, component: CourseListComponent, canActivate: [ ValidSessionGuard ]},        // LIST OF OWNERSHIP (AUTHORIZED / SELF ROLE)
  {path: `dashboard/courses/new`, component: CourseCreateComponent, canActivate: [ ValidSessionGuard ]},
  {path: `dashboard/courses/:id/:edit`, component: CourseEditComponent, canActivate: [ ValidSessionGuard ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppRouting {}
