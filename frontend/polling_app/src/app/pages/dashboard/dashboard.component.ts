import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Poll } from '../../models/dashboard-models/poll';
import { PollService} from '../../services/dashboard-services/poll.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RippleGlobalOptions } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'filled', 'sent', 'status', 'buttons', 'actions'];
  polls: Poll[] = [];
  displayingData: MatTableDataSource<Poll>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  constructor(private pollService: PollService) {
    this.displayingData = new MatTableDataSource<Poll>();   
  }

  filterData(event: MatTabChangeEvent){

    switch(event.tab.textLabel){
      case "Wszystkie":
        this.displayingData.data = this.polls;
        break;
      case "Aktywne":
        this.displayingData.data = this.polls.filter((poll) => poll.status === "aktywna");
        break;
      case "Wstrzymane":
        this.displayingData.data = this.polls.filter((poll) => poll.status === "wstrzymana");
        break;
      case "Oczekujące":
        this.displayingData.data = this.polls.filter((poll) => poll.status === "oczekująca");
        break;
      case "Edytowane":
        this.displayingData.data = this.polls.filter((poll) => poll.status === "edytowana");
        break;
      case "Zakończone":
        this.displayingData.data = this.polls.filter((poll) => poll.status === "zakończona");
        break;
    }
  }

  ngAfterViewInit() {
    this.displayingData.paginator = this.paginator;
    this.displayingData.sort = this.sort;
  }


  ngOnInit(): void {
    //fetch data
    this.pollService.getPolls().subscribe(polls => {
      this.polls = polls;
      this.displayingData.data = polls;
    });
  }

  globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
    animation: {
      enterDuration: 0,
      exitDuration: 0
    }
  };
  
}
