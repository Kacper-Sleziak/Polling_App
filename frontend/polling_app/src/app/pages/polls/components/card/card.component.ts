import { Component, Input, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() poll !: Poll;

  toggleChangeHandle() : void {
    // Change poll status and update dates
    this.pollService.statusChange(this.poll);
  }

  convertDate(date: string): string{
    let dateObject = new Date(date);
    let convertedDate = dateObject.toJSON();
    return convertedDate.replace('-', '.').replace('-', '.').replace('T', ' ').slice(0,16);
  }

  constructor(public dialog: MatDialog, private pollService: PollService) { }

  openDeleteDialog(): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {pollId : this.poll.id}});

    dialogRef.afterClosed().subscribe((result : boolean) => {
      if(result === true){
        this.pollService.deletePoll(this.poll.id);
      }
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
