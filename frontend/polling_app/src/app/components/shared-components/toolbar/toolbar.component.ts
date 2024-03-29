import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/shared-services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router,
              private accountService: AccountService) {}

  ngOnInit(): void {
  }


  hasRoute(route: string): boolean{
    
    // Every path starts with '/' so we can't use includes()
    if(route === '/'){
      if(this.router.url === '/') return true;
      else return false;
    }
    
    return this.router.url.startsWith(route);
  }

  onLogout(): void {
    this.accountService.logoutAccount()
    .subscribe({
      next: () => {
        this.router.navigate(['login']);
      }
    })
  }
}
