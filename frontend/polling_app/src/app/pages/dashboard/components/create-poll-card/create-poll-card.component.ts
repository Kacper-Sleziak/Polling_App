import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll-card',
  templateUrl: './create-poll-card.component.html',
  styleUrls: ['./create-poll-card.component.css'],
})
export class CreatePollCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAdd(): void {
    this.router.navigateByUrl('/create-form');
  }
}
