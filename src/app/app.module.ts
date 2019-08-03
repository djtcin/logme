import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { ActivityComponent } from './activity/activity.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { DataService } from './common/data.service';
import { DataStorageService } from './common/data-storage.service';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    ActivityTypeComponent,
    ActivityLogComponent,
    ActivityListComponent,
    SettingsDialogComponent,
    ActivityDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule
  ],
  providers: [
    DataService, 
    DataStorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ SettingsDialogComponent, ActivityDialogComponent ]
})
export class AppModule { }
