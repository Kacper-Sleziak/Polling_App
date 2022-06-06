import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Poll } from 'src/app/models/dashboard-models/poll';

@Component({
  selector: 'app-polls-as-cards',
  templateUrl: './polls-as-cards.component.html',
  styleUrls: ['./polls-as-cards.component.css']
})
export class PollsAsCardsComponent implements OnInit {

  @Input() displayingPolls: Poll[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
