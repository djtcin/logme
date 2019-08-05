import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DataService } from '../common/data.service';

@Component({
  selector: 'app-import-export-dialog',
  templateUrl: './import-export-dialog.component.html',
  styleUrls: ['./import-export-dialog.component.scss']
})
export class ImportExportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImportExportDialogComponent>,
  	private dataService: DataService) { }

  ngOnInit() {
  }

  onExportClick() {
    this.dataService.exportData();
  }

  onImportChange(event) {
    this.dataService.importData(event.target.files[0]);
    this.dialogRef.close();
  }

}
