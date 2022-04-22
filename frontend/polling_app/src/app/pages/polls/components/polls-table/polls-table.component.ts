import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { UiPollsService } from 'src/app/services/dashboard-services/ui-polls.service';

@Component({
  selector: 'app-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.css']
})
export class PollsTableComponent implements OnInit, AfterViewInit{

  @Input() displayingPolls: Poll[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription;
  displayingData : MatTableDataSource<Poll>;   //Table expects this object to view data
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'filled', 'sent', 'status', 'buttons', 'toggle'];
  

  constructor(private pollService: PollService, private uiPollsService : UiPollsService) { 
    this.displayingData = new MatTableDataSource<Poll>();
    // Subscribe the displayingPolls change caused by status filter
    this.subscription = uiPollsService.onStatusFilterChange().subscribe( (displayingPolls: Poll[]) => { this.displayingData.data = displayingPolls });
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

  // Handle the event emitted by button to change poll status
  onToggleChange(poll : Poll) : void {
    // Change poll status and update dates
    this.pollService.statusChange(poll);
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
    let lowerBound = 1 + page*pageSize;
    let upperBound = page*pageSize + pageSize;
    if(upperBound > length){
      upperBound = length;
    }

    return `${lowerBound} - ${upperBound} z ${length}`;
  }
}
