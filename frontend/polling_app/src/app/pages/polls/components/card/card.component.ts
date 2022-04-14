import { Component, Input, OnInit } from '@angular/core';
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


  taggleChangeHandle() : void {

    // Gdy będzie odświeżanie to będzie zbędne
    if(this.poll.status === 'open'){
      this.poll.status = 'close';
    }
    else{
      this.poll.status = 'open';
    }

    this.pollService.putPollStatus(this.poll.id, this.poll.status);
    // Raczej data będzie aktualizowana po stronie backendu, a więc będzie trzeba odświeżyć kartę 
    this.refreshCard();
  }

  refreshCard() : void{
    // Na razie zamiast slug id w formie stringa
    this.pollService.getPoll( this.poll.id.toString()).subscribe((updatedPoll : Poll) => {
      this.poll = updatedPoll;
    });
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
