import { Component, Inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sending-polls-dialog',
  templateUrl: './sending-polls-dialog.component.html',
  styleUrls: ['./sending-polls-dialog.component.css']
})
export class SendingPollsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollSlug: string}, private formBuilder: FormBuilder) { }

  emails : string[] = []

  emailForm : FormGroup = this.formBuilder.group(
    {
      email: ['']
    }
  );

  ngOnInit(): void {
    this.emailForm.controls['email'].addValidators([Validators.email]);
    
  }

  onAddRecipient(): void{
    console.log("elo");
    
  }

  addEmail(){
    // // Custom error
    // if(this.emailForm.controls['email'].value === ''){
    //   this.emailForm.controls['email'].setErrors({empty: 'true'});
    // }
    
    // Add the email only when valid and not empty
    if(this.emailForm.valid && this.emailForm.controls['email'].value !== ''){
      this.emails.push(this.emailForm.controls['email'].value);
    }
    
  }

  // getEmailErrorMessage(): string{
  //   if(this.emailForm.controls['email'].hasError('empty')){
  //     return "Nie wprowadzono maila";
  //   }
  //   if(this.emailForm.controls['email'].hasError('email')){
  //     return "Email jest niepoprawny";
  //   }
  //   return "";
  // }

}
