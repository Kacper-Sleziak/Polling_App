import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { UiPollsService } from 'src/app/services/dashboard-services/ui-polls.service';
import { CloseOpenedPollDialogComponent } from '../dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { OpenClosedPollDialogComponent } from '../dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';
import { OpenEditingPollDialogComponent } from '../dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';

@Component({
  selector: 'app-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.css']
})
export class PollsTableComponent implements OnInit, AfterViewInit{

  @Input() displayingPolls: Poll[] = [];
  @Output() onDeletePoll = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription;
  displayingData : MatTableDataSource<Poll>;   //Table expects this object to view data
  displayedColumns: string[] = ['id', 'title', 'startDate', 'endDate', 'filled', 'sent', 'status','toggle', 'more'];
  PollStatus = Poll.Status;   // For the access to enum type from component's html
  

  constructor(public dialog: MatDialog, private pollService: PollService, private uiPollsService : UiPollsService) { 
    this.displayingData = new MatTableDataSource<Poll>();
    // Subscribe the displayingPolls change caused by status filter
    this.subscription = uiPollsService.onStatusFilterChange().subscribe( (displayingPolls: Poll[]) => { 
      this.displayingPolls = displayingPolls;
      this.displayingData.data = displayingPolls;
    });
  }
  
  onDeleteButtonClick(poll : Poll) : void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {pollId : poll.id}});

    dialogRef.afterClosed().subscribe((result : boolean) => {
      if(result === true){
        this.pollService.deletePoll(poll.slug);
        this.onDeletePoll.emit(poll.id);
      }
    });

  }

  ngOnInit(): void {
    // It have to by initiate in this block instead of constructor to properly show data in table
    this.displayingData.data = this.displayingPolls;
    // Modify the labels of paginator
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
            this.pollService.statusChange(poll);
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
            this.pollService.statusChange(poll);
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
            this.pollService.statusChange(poll);
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
}
