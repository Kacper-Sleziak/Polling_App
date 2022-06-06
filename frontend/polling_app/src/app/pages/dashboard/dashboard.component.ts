import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { UiDashboardService } from 'src/app/services/dashboard-services/ui-dashboard.service';
import { AccountService } from 'src/app/services/shared-services/account.service';
import { Poll } from '../../models/dashboard-models/poll';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  polls: Poll[] = [];
  displayingPolls: Poll[] = [];
  displayingPollsInTable = new MatTableDataSource<Poll>();  //Table expects this object to view data
  labels: string[] = ['Wszystkie', 'Otwarte', 'Zamknięte', 'Edytowane'];
  changeView: boolean = false;


  constructor(private uiDashboardService: UiDashboardService,
              private accountService: AccountService,
              private pollService: PollService,
              private router: Router) {

    // if(localStorage.getItem('changeView')) this.changeView = JSON.parse(localStorage.getItem('changeView')!);
  }

  ngOnInit(): void {
    // Author id will be returned when user is logged
    this.accountService.getAuthorId().subscribe({
      next: (authorId) =>{
        // Fetch polls via API
        this.pollService.getPolls(authorId).subscribe({
          // If success
          next: (polls: Poll[]) =>{
            this.polls = polls
            this.displayingPolls = this.polls;
            this.displayingPollsInTable.data = this.polls;
          },
          error: (err) =>{
            console.log(err);
          }
        });
      },
      // If error - no one is logged -> redirect to login
      error: err => {
        this.router.navigate(['login']);
      }
    })
    
    // // Subscribe all polls change
    // this.uiDashboardService.onAllPollsChange().subscribe((allPolls) =>{      
    //   this.polls = allPolls;
    // })

    // // Subscribe displaying polls change
    // this.uiDashboardService.onDisplayingPollsChange().subscribe((displayingPolls) =>{
    //   this.displayingPolls = displayingPolls;
    //   this.displayingPollsInTable.data = displayingPolls;
    // })

    // Subscribe all polls change
    this.uiDashboardService.onDeletePoll().subscribe((deletePoll: Poll) =>{      

        // Filter displaying polls
        this.displayingPolls = this.displayingPolls.filter((poll) =>{
          if(poll.id === deletePoll.id) return false;
          else return true;
        })

        // Filter all polls 
        this.polls = this.polls.filter((poll) =>{
          if(poll.id === deletePoll.id) return false;
          else return true;
        })

        this.displayingPollsInTable.data = this.displayingPolls;
    })

    // Subscribe displaying polls change
    this.uiDashboardService.onCopyPoll().subscribe((poll: Poll) =>{
      
      if(this.displayingPolls != this.polls){
        this.polls.push(poll);
        this.displayingPolls.push(poll);
      } 
      else{
        this.displayingPolls.push(poll);
      }
      this.displayingPollsInTable.data = this.displayingPolls;
      
    })
  }


  // ------------------------------------------------------- methods -------------------------------------------------------

  onChangeView(): void {
    this.changeView = !this.changeView;
    localStorage.setItem("changeView", JSON.stringify(this.changeView));
  }

  onAddPoll(): void {
    this.router.navigateByUrl('/create-form');
  }

  onStatusFilterChange(event: MatTabChangeEvent) {

    // let newDisplayingPolls: Poll[] = [];
    // Change displayingPolls
    switch (event.tab.textLabel) {
      case 'Wszystkie':
        this.displayingPolls = this.polls;
        this.displayingPollsInTable.data = this.displayingPolls;
        break;

      case 'Otwarte':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.open
        );
        this.displayingPollsInTable.data = this.displayingPolls;

        break;

      case 'Zamknięte':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.close
        );
        this.displayingPollsInTable.data = this.displayingPolls;
        break;

      case 'Edytowane':
        this.displayingPolls = this.polls.filter(
          (poll) => poll.status === Poll.Status.editing
        );
        this.displayingPollsInTable.data = this.displayingPolls;
        break;
    }
  }
}
