declare var ace: any;
import { AceEditorModule } from 'ng2-ace-editor';

import './setups/quill-image';
import { QuillModule } from 'ngx-quill';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AccordionModule, CollapseModule, PopoverModule, ModalModule, TabsModule, CarouselModule, TypeaheadModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component'; /* MAIN */
import { AppRouting } from './app.routing';    /* ROUTING */
/* PAGES */
import { EntityListComponent } from './pages/entity-list/entity-list.component';
import { EntityViewComponent } from './pages/entity-view/entity-view.component';
import { EntityCreateComponent } from './pages/entity-create/entity-create.component';
import { EntityEditComponent } from './pages/entity-edit/entity-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
/* COMPONENTS */
import { EntityListAllComponent } from './components/entity/entity-list-all/entity-list-all.component';
import { EntityListMineComponent } from './components/entity/entity-list-mine/entity-list-mine.component';
import { EntityListSubmittedComponent } from './components/entity/entity-list-submitted/entity-list-submitted.component';
import { EntityListAdminAllComponent } from './components/entity/entity-list-admin-all/entity-list-admin-all.component';
import { EntityFormComponent} from './components/entity/entity-form/entity-form.component';
import { EntityFormSectionsComponent } from './components/entity/entity-form-sections/entity-form-sections.component';
import { EntityFormSubmitCaseComponent } from './components/entity/entity-form-submit-case/entity-form-submit-case.component';
import { EntityFormPreviewComponent } from './components/entity/entity-form-preview/entity-form-preview.component';
import { RemoveEntityComponent } from './components/entity/modals/remove-entity/remove-entity.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseViewComponent } from './pages/course-view/course-view.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { CourseListAllComponent } from './components/course/course-list-all/course-list-all.component';
import { CourseFormPreviewComponent } from './components/course/course-form-preview/course-form-preview.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseListMineComponent } from './components/course/course-list-mine/course-list-mine.component';
import { CourseFormModulesComponent } from './components/course/course-form-modules/course-form-modules.component';
import { CourseFormConnectComponent } from './components/course/course-form-connect/course-form-connect.component';
import { CourseFormChallengeComponent } from './components/course/course-form-challenge/course-form-challenge.component';
import { SubNavComponent} from './components/sub-nav/sub-nav.component';
import {  RecoverPasswordUpdateComponent, ConfirmAccountComponent } from '@mahrio/shared';
/* SHARED */
import { SharedModule } from '@mahrio/shared';
import { SessionComponent } from './pages/session/session.component';
import { SubmitCaseComponent } from './pages/submit-case/submit-case.component';
import { ModuleFormComponent } from './components/module-form/module-form.component';
import { EntityTypeaheadComponent } from './components/entity/entity-typeahead/entity-typeahead.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CourseTakeComponent } from './components/course/course-take/course-take.component';


@NgModule({
  declarations: [
    /* MAIN */
    AppComponent,
    /* PAGES */
    EntityListComponent, EntityViewComponent, EntityCreateComponent, EntityEditComponent, HomeComponent,
    NotFoundComponent, ProfileComponent, DashboardComponent,
    /* COMPONENTS */
    EntityFormComponent, EntityFormSectionsComponent,
    EntityFormSubmitCaseComponent, SubNavComponent, EntityListAllComponent, EntityListMineComponent,
    EntityListSubmittedComponent, EntityListAdminAllComponent,
    EntityFormPreviewComponent, CourseListComponent, CourseViewComponent, CourseEditComponent,
    CourseCreateComponent, CourseListAllComponent, CourseFormPreviewComponent, CourseFormComponent,
    CourseListMineComponent, CourseFormModulesComponent, SessionComponent, SubmitCaseComponent, RemoveEntityComponent, ModuleFormComponent,
    EntityTypeaheadComponent, CourseFormConnectComponent, CourseFormChallengeComponent, PaymentComponent, CourseTakeComponent, PrivacyComponent, TermsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([]),
    AppRouting,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    QuillModule,
    AceEditorModule,
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ RecoverPasswordUpdateComponent, RemoveEntityComponent, PaymentComponent, ConfirmAccountComponent]
})
export class ProducerModule { }
