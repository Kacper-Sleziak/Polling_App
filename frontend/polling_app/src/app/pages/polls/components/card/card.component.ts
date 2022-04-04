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


  // @Input() text!: string;
  // @Input() status!: string;
  // @Input() id!: number;

  @Input() poll !: Poll;

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
