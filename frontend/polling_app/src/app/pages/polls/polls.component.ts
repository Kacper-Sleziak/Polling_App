import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Poll } from '../../models/dashboard-models/poll';
import { PollService } from '../../services/dashboard-services/poll.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  polls: Poll[] = [];
  displayingData: Poll[] = [];


  constructor(private pollService: PollService) { 
  }

  ngOnInit(): void {
    //fetch data
    this.pollService.getPolls().subscribe(polls => {
      this.polls = polls;
      this.displayingData = polls;
    });
  }

}
