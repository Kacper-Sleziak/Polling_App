import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Email } from 'src/app/models/dashboard-models/email';
import { MailService } from 'src/app/services/dashboard-services/mail.service';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-sending-polls-dialog',
  templateUrl: './sending-polls-dialog.component.html',
  styleUrls: ['./sending-polls-dialog.component.css']
})
export class SendingPollsDialogComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: {pollSlug: string}, 
                private formBuilder: FormBuilder, 
                private mailService: MailService,
                private snackBar: MatSnackBar,
                private ngxCsvParser: NgxCsvParser) {}

  emails : string[] = [];
  isSubject: boolean = false;
  isRecipient: boolean = false;
  selectedFile: any = null;
  removeHistory: string[] = []
  allEmailsRemoveHistory: Array<Array<string>> = [];


  emailForm : FormGroup = this.formBuilder.group(
    {
      email: ['']
    }
  );

  messageForm : FormGroup = this.formBuilder.group(
    {
      subject: [''],
      message: ['']
    }
  );

  ngOnInit(): void {
    this.emailForm.controls['email'].addValidators([Validators.email]);
    this.messageForm.controls['subject'].addValidators([Validators.required]);
  };

  addEmail(){
    // // Custom error
    // if(this.emailForm.controls['email'].value === ''){
    //   this.emailForm.controls['email'].setErrors({empty: 'true'});
    // }
    
    let email = this.emailForm.controls['email'].value;
    // Add the email only when valid and not empty
    if(this.emailForm.valid && email !== ''){

      // Check that the email exist
      let filteredArray = this.emails.filter((e) => {
        if(e === email) return true;
        return false;
      })

      if(filteredArray.length == 0){
        this.emails.push(email);
      }
      // else{
      //   this.emailForm.controls['email'].setErrors({exist: 'true'});
      // }
      this.isRecipient = true;
    }

  }

  onDeleteEmail(emailToRemove : string){
    // Delete email from array
    this.emails = this.emails.filter((email)=>{
      if(email === emailToRemove) 
      {
        this.removeHistory.push(emailToRemove);
        return false;
      }
      return true;
    })

    // Check that the array is empty -> if so we can't sent the poll
    if(this.emails.length == 0) this.isRecipient = false;
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

  onSubjectChange(value : any): void{
    if(value.target.value !== '') this.isSubject = true;
    else this.isSubject = false;
  }

  onSendPoll(){
    let subject: string = this.messageForm.controls['subject'].value;
    let message: string = this.messageForm.controls['message'].value;

    this.mailService.postMail(new Email(subject, message, this.data.pollSlug, this.emails));
    this.openSnackBar();
  }

  // Open snackbar function
  openSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'end',
      panelClass: 'custom-snack-bar'
    });
  }


  onFileSelected(event: any): void {

    this.selectedFile = event.target.files[0] ?? null;
    
  }


  onRemoveAllEmails(): void{

    if(this.emails.length){
      // Ad "ALL" tag to signal that all emails have been deleted
      this.removeHistory.push("ALL");
      this.allEmailsRemoveHistory.push(this.emails);
      this.emails = [];
      this.isRecipient = false;
    }
  }


  onReturnEmails(): void{

    // If history isn't empty
    if(this.removeHistory.length){

      // Pop from array. We will get: email or string "ALL"
      let lastDeletedEmail = this.removeHistory.pop()!;

      // We have to add group of emails
      if(lastDeletedEmail === 'ALL'){

        if(this.allEmailsRemoveHistory.length){
          let lastGroupRemove = this.allEmailsRemoveHistory.pop()!;
          this.emails = [...new Set([...this.emails , ...lastGroupRemove])];
        }

      }
      // Otherwise we have to add only one email
      else{
        this.emails = [...new Set([...this.emails , lastDeletedEmail])];
      }

      this.isRecipient = true;
    }
  }
}


