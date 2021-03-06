import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { ActivityComponent } from './activity/activity.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { DataService } from './common/data.service';
import { DataStorageService } from './common/data-storage.service';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';
import { SummaryBarComponent } from './summary-bar/summary-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    ActivityTypeComponent,
    ActivityListComponent,
    SettingsDialogComponent,
    ActivityDialogComponent,
    ImportExportDialogComponent,
    SummaryBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    DataService, 
    DataStorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ 
    SettingsDialogComponent, 
    ActivityDialogComponent,
    ImportExportDialogComponent
  ]
})
export class AppModule { }
