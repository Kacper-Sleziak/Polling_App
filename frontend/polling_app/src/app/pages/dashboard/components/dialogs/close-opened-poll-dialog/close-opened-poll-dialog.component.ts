import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-close-opened-poll-dialog',
  templateUrl: './close-opened-poll-dialog.component.html',
  styleUrls: ['./close-opened-poll-dialog.component.css']
})
export class CloseOpenedPollDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollName: string}) { }

  ngOnInit(): void {
  }

}
