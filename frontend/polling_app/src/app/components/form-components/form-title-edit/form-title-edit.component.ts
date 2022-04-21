import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-title-edit',
  templateUrl: './form-title-edit.component.html',
  styleUrls: ['./form-title-edit.component.css'],
})
export class FormTitleEditComponent implements OnInit {
  @Input() form_title: string = '';
  @Input() description: string = '';
  constructor() {}

  ngOnInit(): void {}
}
