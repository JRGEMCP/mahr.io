import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SessionNewComponent } from './components/session/session-new/session-new.component';
import { HttpClientModule} from "@angular/common/http";
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { UserNewComponent } from './components/session/user-new/user-new.component';
import { CollapseModule, PopoverModule, ModalModule } from 'ngx-bootstrap';
import { MilestoneComponent } from './components/milestones/milestone/milestone.component';
import { MilestonePanelComponent } from './components/milestones/milestone-panel/milestone-panel.component';
import { MilestoneListComponent } from './components/milestones/milestone-list/milestone-list.component';
import { ChipsComponent } from './components/tags/chips.component';
import { ChipComponent } from './components/tags/chip/chip.component';
import { MarkdownModule } from 'ngx-markdown';
import { RecoverPasswordComponent } from './components/session/recover-password/recover-password.component';
import { RecoverPasswordUpdateComponent } from './components/session/recover-password-update/recover-password-update.component';
import { ConfirmAccountComponent } from './components/session/confirm-account/confirm-account.component';
import { UpdatePasswordComponent } from './components/session/update-password/update-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { SessionComponent} from "./components/session/session.component";
import { PaymentComponent } from './components/payment/payment.component';
import { EntityFilterComponent} from './components/entity-filter/entity-filter.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    MarkdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxLocalStorageModule.forRoot()
  ],
  declarations: [HeaderNavComponent, SessionNewComponent, UserNewComponent,
    MilestoneComponent, MilestonePanelComponent, MilestoneListComponent,
    ChipComponent,
    ChipsComponent,
    RecoverPasswordComponent,
    RecoverPasswordUpdateComponent,
    ConfirmAccountComponent,
    UpdatePasswordComponent,
    FooterComponent,
    AlertBannerComponent,
    SessionComponent,
    PaymentComponent,
    EntityFilterComponent
  ],
  exports: [HeaderNavComponent, MilestoneComponent, MilestonePanelComponent,
    MilestoneListComponent, ChipsComponent, RecoverPasswordComponent,
    RecoverPasswordUpdateComponent, SessionNewComponent, UserNewComponent, EntityFilterComponent,
    UpdatePasswordComponent, FooterComponent, AlertBannerComponent, ConfirmAccountComponent]
})
export class SharedModule { }
