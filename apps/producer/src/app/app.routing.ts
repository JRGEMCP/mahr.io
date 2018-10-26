import { NgModule} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EntityListComponent } from './pages/entity-list/entity-list.component';
import { EntityCreateComponent } from './pages/entity-create/entity-create.component';
import { EntityEditComponent } from './pages/entity-edit/entity-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent} from "./pages/dashboard/dashboard.component";
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { ValidSessionGuard } from '@mahrio/shared';
const routes: Routes = [
  {path: 'tutorials/new', component: EntityCreateComponent, canActivate: [ ValidSessionGuard ]},
  {path: 'tutorials/:id/:edit', component: EntityEditComponent, canActivate: [ ValidSessionGuard ]},
  {path: 'tutorials/:id/dx/:edit', component: EntityEditComponent,  data: {dx: true}, canActivate: [ ValidSessionGuard ]},
  {path: 'dashboard/profile', component: ProfileComponent, canActivate: [ ValidSessionGuard ]},
  {path: 'dashboard/:type', component: EntityListComponent, canActivate: [ ValidSessionGuard ]},        // LIST OF OWNERSHIP (AUTHORIZED / SELF ROLE)
  {path: 'dashboard/admin/:type', component: EntityListComponent, canActivate: [ ValidSessionGuard ]},  // LIST OF ALL (INSTRUCTOR ROLE)
  {path: 'dashboard/dx/:type', component: EntityListComponent, canActivate: [ ValidSessionGuard ]},    // LIST OF ALL IN USE CASE REVIEW (REVIEWER/INSTRUCTOR ROLE)
  {path: 'dashboard/courses/:type', component: CourseListComponent, canActivate: [ ValidSessionGuard ]},        // LIST OF OWNERSHIP (AUTHORIZED / SELF ROLE)

  {path: 'courses/new', component: CourseCreateComponent, canActivate: [ ValidSessionGuard ]},
  // {path: 'courses/:link', component: CourseViewComponent},
  // {path: 'courses/:link/modules', component: CourseViewComponent},
  // {path: 'courses/:link/modules/:section', component: CourseViewComponent},
  {path: 'courses/:id/:edit', component: CourseEditComponent, canActivate: [ ValidSessionGuard ]},

  {path: 'dashboard', component: DashboardComponent, canActivate:[ ValidSessionGuard ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppRouting {}
