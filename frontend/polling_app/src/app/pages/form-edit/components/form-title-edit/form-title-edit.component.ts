import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-title-edit',
  templateUrl: './form-title-edit.component.html',
  styleUrls: ['./form-title-edit.component.css'],
})
export class FormTitleEditComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() descriptionChange: EventEmitter<string> =
    new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  handleTitleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.titleChange.emit(target.value);
  };

  handleDescriptionChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.descriptionChange.emit(target.value);
  };
}
