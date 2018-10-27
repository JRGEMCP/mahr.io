import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidSessionGuard } from "@mahrio/shared";

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { DashboardInventoryComponent } from './dashboard-inventory/dashboard-inventory.component';
import { ProfileComponent } from "./profile/profile.component";
import { RouterModule, Routes} from "@angular/router";
import { SharedModule } from '@mahrio/shared';
import { TabsModule } from "ngx-bootstrap";

const routes: Routes = [
  {path: 'dashboard', component: DashboardInventoryComponent, canActivate: [ValidSessionGuard] },
  {path: 'dashboard/profile', component: ProfileComponent, canActivate: [ValidSessionGuard] }
]
@NgModule({
  declarations: [AppComponent, DashboardInventoryComponent, ProfileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forChild(routes),
    SharedModule,
    TabsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class DashboardModule {}
