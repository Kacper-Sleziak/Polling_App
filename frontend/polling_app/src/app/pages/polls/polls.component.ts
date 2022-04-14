import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
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

  filterData(event: MatTabChangeEvent){

    switch(event.tab.textLabel){
      case "Wszystkie":
        this.displayingData = this.polls;
        break;
      case "Otwarte":
        this.displayingData = this.polls.filter((poll) => poll.status === "open");
        break;
      case "Zamknięte":
        this.displayingData = this.polls.filter((poll) => poll.status === "close");
        break;
      case "Edytowane":
        this.displayingData = this.polls.filter((poll) => poll.status === "editing");
        break;
    }
  }

  ngOnInit(): void {
    //fetch data
    this.pollService.getPolls().subscribe(polls => {
      this.polls = polls;
      this.displayingData = polls;
    });
  }

}
