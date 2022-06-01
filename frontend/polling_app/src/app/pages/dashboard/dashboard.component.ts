import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UiPollsService } from 'src/app/services/dashboard-services/ui-polls.service';
import { AccountService } from 'src/app/services/shared-services/account.service';
import { Poll } from '../../models/dashboard-models/poll';
import { PollService } from '../../services/dashboard-services/poll.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  polls: Poll[] = [];
  displayingPolls: Poll[] = [];
  labels: string[] = ['Wszystkie', 'Otwarte', 'Zamknięte', 'Edytowane'];
  changeView: boolean = false;

  constructor(
    private pollService: PollService,
    private uiPollsService: UiPollsService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {}

  onChangeView(): void {
    this.changeView = !this.changeView;
  }

  onStatusFilterChange(event: MatTabChangeEvent) {
    // Change displayingPolls
    switch (event.tab.textLabel) {
      case 'Wszystkie':
        this.displayingPolls = this.polls;
        break;
      case 'Otwarte':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.open
        );
        break;
      case 'Zamknięte':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.close
        );
        break;
      case 'Edytowane':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.editing
        );
        break;
    }
    // Inform components which base on displayingPolls table that data have been changed
    this.uiPollsService.setDisplayingPolls(this.displayingPolls);
  }

  onDeletePoll(pollId: number) {
    // Delete poll from current displaying polls
    this.displayingPolls = this.displayingPolls.filter((poll) => {
      if (pollId === poll.id) return false;
      return true;
    });

    // Delete poll from all polls
    this.polls = this.polls.filter((poll) => {
      if (pollId === poll.id) return false;
      return true;
    });

    // Use service to update date in child components
    this.uiPollsService.setDisplayingPolls(this.displayingPolls);
  }

  ngOnInit(): void {

    this.accountService.getAuthorId().subscribe({
        next: id => {
          // If success 
          this.pollService
          .getPolls(id)
          .subscribe((polls) => {
            this.polls = polls;
            this.displayingPolls = polls;
            this.uiPollsService.setDisplayingPolls(polls);
          });
        },
        // If error - no one is logged in  -> redirect to login
        error: err => {
          this.router.navigate(['login']);
        }
      }
    )
  }
}
