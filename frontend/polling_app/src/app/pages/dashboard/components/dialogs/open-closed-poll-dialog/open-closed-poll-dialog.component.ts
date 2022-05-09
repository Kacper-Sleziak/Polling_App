import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-closed-poll-dialog',
  templateUrl: './open-closed-poll-dialog.component.html',
  styleUrls: ['./open-closed-poll-dialog.component.css']
})
export class OpenClosedPollDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollTitle: string}) { }

  ngOnInit(): void {
  }

}
