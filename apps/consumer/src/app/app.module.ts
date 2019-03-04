import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { SharedModule, SessionComponent, PaymentComponent} from "@mahrio/shared";
import { ProducerModule } from "../../../producer/src/app/app.module";
import { DashboardModule } from "../../../dashboard/src/app/app.module";

declare var ace: any;
import { AceEditorModule } from 'ng2-ace-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AccordionModule, CollapseModule, PopoverModule, ModalModule, TabsModule, CarouselModule, TypeaheadModule} from 'ngx-bootstrap';
import { CourseInventoryComponent } from './course-inventory/course-inventory.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { AssetInventoryComponent } from './asset-inventory/asset-inventory.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import * as env from '../environments/environment';
import { AssetInventoryAllComponent } from './asset-inventory-all/asset-inventory-all.component';
import { AssetDetailViewComponent } from './asset-detail-view/asset-detail-view.component';
import { CourseInventoryAllComponent } from './course-inventory-all/course-inventory-all.component';
import { CourseDetailViewComponent } from './course-detail-view/course-detail-view.component';
import { CourseDetailEnrolledComponent } from './course-detail-enrolled/course-detail-enrolled.component';
const dPath:string = Object.freeze( env.environment.asset[0].toLowerCase() );
const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'courses', component: CourseInventoryComponent},
  {path: 'courses/:link', component: CourseDetailComponent},
  {path: 'courses/:link/modules', component: CourseDetailComponent},
  {path: 'courses/:link/modules/:section', component: CourseDetailComponent},
  {path: 'tutorials', component: AssetInventoryComponent},
  {path: 'tutorials/:link', component: AssetDetailComponent},
  {path: 's/privacy', component: PrivacyComponent},
  {path: 's/terms', component: TermsComponent},
  {path: 'session/:any', component: SessionComponent},
  {path: 'user/:any', component: SessionComponent},
  {path: 'account/:any', component: SessionComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [AppComponent, CourseInventoryComponent, CourseDetailComponent, HomeComponent, PrivacyComponent, TermsComponent, AssetInventoryComponent, AssetDetailComponent, AssetInventoryAllComponent, AssetDetailViewComponent, CourseInventoryAllComponent, CourseDetailViewComponent, CourseDetailEnrolledComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    NxModule.forRoot(),
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    AceEditorModule,
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    DashboardModule,
    ProducerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PaymentComponent]
})
export class ConsumerModule { }
