import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
  	BrowserAnimationsModule, 
  	MatButtonModule, 
  	MatToolbarModule, 
  	MatMenuModule,
  	MatIconModule,
  	MatExpansionModule,
  	MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
	],
  exports: [
  	BrowserAnimationsModule, 
  	MatButtonModule, 
  	MatToolbarModule, 
  	MatMenuModule,
  	MatIconModule,
  	MatExpansionModule,
  	MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
	],
})
export class CustomMaterialModule { }
