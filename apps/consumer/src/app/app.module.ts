import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { SharedModule, SessionComponent } from "@mahrio/shared";

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
const dPath = env.environment.asset[0].toLowerCase();
const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'courses', component: CourseInventoryComponent},
  {path: 'courses/:link', component: CourseDetailComponent},
  {path: dPath, component: AssetInventoryComponent},
  {path: dPath + '/:link', component: AssetDetailComponent},
  {path: 's/privacy', component: PrivacyComponent},
  {path: 's/terms', component: TermsComponent},
  {path: 'session/:any', component: SessionComponent},
  {path: 'user/:any', component: SessionComponent},
  {path: 'account/:any', component: SessionComponent},

];

@NgModule({
  declarations: [AppComponent, CourseInventoryComponent, CourseDetailComponent, HomeComponent, PrivacyComponent, TermsComponent, AssetInventoryComponent, AssetDetailComponent, AssetInventoryAllComponent, AssetDetailViewComponent],
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
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
