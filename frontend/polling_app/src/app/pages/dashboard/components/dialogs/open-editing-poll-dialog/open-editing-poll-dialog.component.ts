import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-editing-poll-dialog',
  templateUrl: './open-editing-poll-dialog.component.html',
  styleUrls: ['./open-editing-poll-dialog.component.css']
})
export class OpenEditingPollDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollTitle: string}) { }

  ngOnInit(): void {
  }

}
