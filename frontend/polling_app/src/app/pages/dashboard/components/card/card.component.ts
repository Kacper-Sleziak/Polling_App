import { Component, Output ,Input, OnInit, EventEmitter, ViewChild, AfterViewInit, Renderer2, ElementRef, TemplateRef} from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { OpenEditingPollDialogComponent } from '../dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';
import { CloseOpenedPollDialogComponent } from '../dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { OpenClosedPollDialogComponent } from '../dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';
import { SendingPollsDialogComponent } from '../dialogs/sending-polls-dialog/sending-polls-dialog.component';
import { UiDashboardService } from 'src/app/services/dashboard-services/ui-dashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() poll !: Poll;
  @Input() isMarked: boolean = false;
  @ViewChild('card', {read: ElementRef}) card!: ElementRef<HTMLElement>;


  // @ViewChild('span') span!: ElementRef;
  PollStatus = Poll.Status;   // For the access to enum type from component's html


  constructor(public dialog: MatDialog, 
              private pollService: PollService,
              private renderer: Renderer2,
              private uiDashboardService: UiDashboardService) {}
              

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    if(this.isMarked){     
      // Print grey bottom border
      this.renderer.setStyle(this.card.nativeElement, 'margin-bottom', '0.5625em'); 
      this.renderer.setStyle(this.card.nativeElement, 'border-bottom', '0.1875em solid lightgrey'); 
    }
    
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
            this.pollService.statusChange(this.poll).subscribe({
              error: (err) =>{
                console.log(err);
              }
            });
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
            this.pollService.statusChange(this.poll).subscribe({
              error: (err) =>{
                console.log(err);
              }
            });
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
            this.pollService.statusChange(this.poll).subscribe({
              error: (err) =>{
                console.log(err);
              }
            });
          }
        });
        break;
    }
  }

  convertDate(date: string): string{
    let dateObject = new Date(date);
    
    let dateWithoutTime = (dateObject.toLocaleDateString().replace('/', '.')).replace('/', '.');    // We want to see template: dd.mm.yyyy
    // Note: toTimeString() function returns the time increased by your timezone offset (so the time which you see at the computer's clock)
    let timeWithoutDate = dateObject.toTimeString().slice(0,5); 
    let convertedDate = " " + dateWithoutTime + '  [ ' + timeWithoutDate + ' ]';
    
    return convertedDate;
  }

  onDeleteButtonClick(): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {pollId : this.poll.id}});

    dialogRef.afterClosed().subscribe((result : boolean) => {

      // If dialog result is true
      if(result === true){
        this.pollService.deletePoll(this.poll.slug).subscribe({
          // If success
          next: () => {
            this.uiDashboardService.deletePoll(this.poll);
          },
          error: (err) => {
            console.log(err);
            // TODO - snackbar
          }
        });
      }
    });
  }

  onSendButtonClick(): void{
    // Open sending polls dialog
    const dialogRef = this.dialog.open(SendingPollsDialogComponent, {data: {poll : this.poll}, width: '900px', hasBackdrop: true});
  }

  onCopyButtonClick(): void{

    this.pollService.copyPoll(this.poll.slug).subscribe({
      // If success
      next: (poll: any) =>{
        // Update displaying polls in Dashboard
        this.uiDashboardService.copyPoll(new Poll(
                poll.id,
                poll.title,
                poll.description,
                poll.slug,
                poll.start_date,
                poll.end_date,
                poll.create_date,
                poll.filling,
                poll.sent,
                poll.status,
                poll.author)
        );
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
