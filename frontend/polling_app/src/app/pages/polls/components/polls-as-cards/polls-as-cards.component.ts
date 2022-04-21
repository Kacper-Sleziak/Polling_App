import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { UiPollsService } from 'src/app/services/dashboard-services/ui-polls.service';

@Component({
  selector: 'app-polls-as-cards',
  templateUrl: './polls-as-cards.component.html',
  styleUrls: ['./polls-as-cards.component.css']
})
export class PollsAsCardsComponent implements OnInit {

  @Input() displayingPolls: Poll[] = [];
  subscription: Subscription;

  constructor(private uiPollsService : UiPollsService) { 
    // Subscribe the displayingPolls change caused by status filter
    this.subscription = uiPollsService.onStatusFilterChange().subscribe( (displayingPolls : Poll[]) => this.displayingPolls = displayingPolls);
  }

  ngOnInit(): void {
  }

}
