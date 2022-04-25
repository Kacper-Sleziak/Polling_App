import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-edit-controls',
  templateUrl: './question-edit-controls.component.html',
  styleUrls: ['./question-edit-controls.component.css'],
})
export class QuestionEditControlsComponent implements OnInit {
  @Output() onQuestionCopy: EventEmitter<any> = new EventEmitter();
  @Output() onQuestionRemove: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleCopyButton = () => {
    this.onQuestionCopy.emit();
  };

  handleRemoveButton = () => {
    this.onQuestionRemove.emit();
  };
}
