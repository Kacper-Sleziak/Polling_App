import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sending-polls-dialog',
  templateUrl: './sending-polls-dialog.component.html',
  styleUrls: ['./sending-polls-dialog.component.css']
})
export class SendingPollsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollSlug: string}) { }

  ngOnInit(): void {
  }

}
