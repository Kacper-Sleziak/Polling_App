import { Component, Output ,Input, OnInit, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { OpenEditingPollDialogComponent } from '../dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';
import { CloseOpenedPollDialogComponent } from '../dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { OpenClosedPollDialogComponent } from '../dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() poll !: Poll;
  @Output() onDeletePoll = new EventEmitter<number>();
  PollStatus = Poll.Status;   // For the access to enum type from component's html


  constructor(public dialog: MatDialog, private pollService: PollService) { }

  ngOnInit(): void {
  }


  onToggleChange(matSildeToggle : MatSlideToggle) : void {

    let dialogRef : MatDialogRef<any>;

    switch(this.poll.status){

      case Poll.Status.open:
        // Don't uncheck the slideToggle without user response from dialog
        matSildeToggle.checked = true;
        // Show dialog
        dialogRef = this.dialog.open(CloseOpenedPollDialogComponent, {data: {pollTitle : this.poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(this.poll);
          }
        });
        break;

      case Poll.Status.close:
        // Don't check the slideToggle without user response from dialog
        matSildeToggle.checked = false;
        // Show dialog
        dialogRef = this.dialog.open(OpenClosedPollDialogComponent, {data: {pollTitle : this.poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(this.poll);
          }
        });
        break;

      case Poll.Status.editing:
        // Don't check the slideToggle without user response from dialog
        matSildeToggle.checked = false;
        // Show dialog
        dialogRef = this.dialog.open(OpenEditingPollDialogComponent, {data: {pollTitle : this.poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(this.poll);
          }
        });
        break;
    }
  }

  convertDate(date: string): string{
    let dateObject = new Date(date);
    console.log(date);
    
    let dateWithoutTime = (dateObject.toLocaleDateString().replace('/', '.')).replace('/', '.');    // We want to see template: dd.mm.yyyy
    // Note: toTimeString() function returns the time increased by your timezone offset (so the time which you see at the computer's clock)
    let timeWithoutDate = dateObject.toTimeString().slice(0,5); 
    let convertedDate = " " + dateWithoutTime + '  [ ' + timeWithoutDate + ' ]';
    
    return convertedDate;
  }

  onDeleteButtonClick(): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {pollId : this.poll.id}});

    dialogRef.afterClosed().subscribe((result : boolean) => {
      if(result === true){
        this.pollService.deletePoll(this.poll.slug);
        this.onDeletePoll.emit(this.poll.id);
      }
    });
  }
}
