import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent implements OnInit {

  @Input() labelsList : string[] = [];
  @Output() tabChange : EventEmitter<MatTabChangeEvent>  = new EventEmitter();

  constructor() { }

  onTabChange(event : MatTabChangeEvent): void{
    this.tabChange.emit(event);
  }

  ngOnInit(): void {
  }

}
