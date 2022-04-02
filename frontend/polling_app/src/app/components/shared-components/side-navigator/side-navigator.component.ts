import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigator',
  templateUrl: './side-navigator.component.html',
  styleUrls: ['./side-navigator.component.css']
})
export class SideNavigatorComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  hasRoute(route: string): boolean{
    return this.router.url.includes(route);
  }

}
