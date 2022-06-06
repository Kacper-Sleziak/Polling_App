import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { UiDashboardService } from 'src/app/services/dashboard-services/ui-dashboard.service';
import { CloseOpenedPollDialogComponent } from '../dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { OpenClosedPollDialogComponent } from '../dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';
import { OpenEditingPollDialogComponent } from '../dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';
import { SendingPollsDialogComponent } from '../dialogs/sending-polls-dialog/sending-polls-dialog.component';

@Component({
  selector: 'app-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.css']
})

export class PollsTableComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayingData = new MatTableDataSource<Poll>(); //Table expects this object to view data
  displayedColumns: string[] = ['id', 'title', 'startDate', 'endDate', 'filled', 'sent', 'status','toggle', 'more'];
  PollStatus = Poll.Status; // For the access to enum type from component's html  

  constructor(  public dialog: MatDialog, 
                private pollService: PollService, 
                private uiDashboardService : UiDashboardService) {}

  ngOnInit(): void {
    // Modify labels of paginator
    this.paginator._intl.itemsPerPageLabel = "Liczba ankiet na stronę: ";
    this.paginator._intl.getRangeLabel = this.customGetRangeLabel;
    this.paginator._intl.previousPageLabel = 'Poprzednia strona';
    this.paginator._intl.nextPageLabel = 'Następna strona';
  }

  ngAfterViewInit(): void {
    // Add paginator and sort - works properly only in this block
    this.displayingData.paginator = this.paginator;
    this.displayingData.sort = this.sort;
  }
  

  // -------------------------------------------------------- methods --------------------------------------------------------

  onDeleteButtonClick(poll : Poll) : void {
    // Open dialog
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {pollId : poll.id}});

    // Subscribe close
    dialogRef.afterClosed().subscribe((result : boolean) => {
      // If dialog result is true
      if(result === true){
        this.pollService.deletePoll(poll.slug).subscribe({
          // If success
          next: () =>{
            this.uiDashboardService.deletePoll(poll);
          },
          error: (err) => {
            console.log(err);
            // TODO - snackbar
          }
        })
      }
    });
  }

  onCopyButtonClick(poll : Poll): void{

    this.pollService.copyPoll(poll.slug).subscribe({
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

  // Handle the event emitted by slideButton 
  onToggleChange(matSildeToggle : MatSlideToggle, poll : Poll) : void {

    let dialogRef : MatDialogRef<any>;

    switch(poll.status){

      case Poll.Status.open:
        // Don't uncheck the slideToggle without user response from dialog
        matSildeToggle.checked = true;
        // Show dialog
        dialogRef = this.dialog.open(CloseOpenedPollDialogComponent, {data: {pollTitle : poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(poll).subscribe({
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
        dialogRef = this.dialog.open(OpenClosedPollDialogComponent, {data: {pollTitle : poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(poll).subscribe({
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
        dialogRef = this.dialog.open(OpenEditingPollDialogComponent, {data: {pollTitle : poll.title}});
        dialogRef.afterClosed().subscribe((result : boolean) => {
          if(result === true){
            // Note: The slideToggle will change position when update poll data
            this.pollService.statusChange(poll).subscribe({
              error: (err) =>{
                console.log(err);
              }
            });
          }
        });
        break;
    }
  }

  getDateWithoutTime(date: string) : string{
    let dateObject = new Date(date);
    let dateWithoutTime = (dateObject.toLocaleDateString().replace('/', '.')).replace('/', '.');    // Templet: dd.mm.yyyy 
    return dateWithoutTime;
  }

  getTimeWithoutDate(date: string) : string{
    let dateObject = new Date(date);
    let timeWithoutDate = dateObject.toTimeString().slice(0,5);
    return timeWithoutDate;
  }

  // Change range label of paginator
  customGetRangeLabel(page: number, pageSize: number, length: number) : string{
    let lowerBound : number;

    if(length === 0) lowerBound = 0;
    else lowerBound = 1 + page*pageSize;
    
    let upperBound = page*pageSize + pageSize;
    if(upperBound > length){
      upperBound = length;
    }

    return `${lowerBound} - ${upperBound} z ${length}`;
  }

  onSendButtonClick(slug: string): void{
    // Open sending polls dialog
    const dialogRef = this.dialog.open(SendingPollsDialogComponent, {data: {pollSlug : slug}, width: '900px', hasBackdrop: true});
  }

}
