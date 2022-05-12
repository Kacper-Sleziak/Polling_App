import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCsvParser } from 'ngx-csv-parser';
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
                private ngxCsvParser : NgxCsvParser) {}

  emails : string[] = [];
  isSubject: boolean = false;
  isRecipient: boolean = false;
  selectedFile: any = null;
  actionsLog: string[] = [];
  deleteHistory: string[][] = [];
  addHistory: string[][] = [];
  deleteFromIndexLog: number[] = [];   //To known where restore email when 'Undo' operation



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

  // getEmailErrorMessage(): string{
  //   if(this.emailForm.controls['email'].hasError('empty')){
  //     return "Nie wprowadzono maila";
  //   }
  //   if(this.emailForm.controls['email'].hasError('email')){
  //     return "Email jest niepoprawny";
  //   }
  //   return "";
  // }


  // Open snackbar function
  onSnackbarOpen() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'end',
      panelClass: 'custom-snack-bar'
    });
  }


  onSubjectChange(value : any): void{
    if(value.target.value !== '') this.isSubject = true;
    else this.isSubject = false;
  }

  onSendPoll(){
    let subject: string = this.messageForm.controls['subject'].value;
    let message: string = this.messageForm.controls['message'].value;

    this.mailService.postMail(new Email(subject, message, this.data.pollSlug, this.emails));
    this.onSnackbarOpen();
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    
    if(this.selectedFile !== null){
      const reader = new FileReader();
      reader.onload = (e) => {

        const str = e.target!.result?.toString();

        // Place all rows (without header to array)
        const rows = str!.slice(str!.indexOf("\n") + 1).split(new RegExp(/\r\n|\r|\n/));
        // Get first row to check that any field match to email's regex
        const firstRow = rows[0];

        // Split row via comma
        const firstRowFields = firstRow.split(",");
        
        // Trimed fields
        const trimedFields =  firstRowFields.map((field) => {
          return field.trim();
        })
        let emailIndex: number = -1;
        // Looking for email in row (some() - if any iterations returns true -> break)
        let isEmail = trimedFields.some((field, index) => {

            if(field.match(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))){
              emailIndex = index;
              return true;
            }
            return false;
        }) 

        if(isEmail){
          let rowFields: string[] = [];
          let emailsToAdd: string[] = [];
          // Adding emails
          rows.forEach((row) => {
            // Prevent empty lines under data
            if(row !== ""){
              rowFields = row.split(new RegExp(","));
              emailsToAdd.push(rowFields[emailIndex]);
            }
          })

          // Add emails
          if(emailsToAdd.length){
            this.addHistory.push(emailsToAdd);
            this.actionsLog.push('ADD');
            this.emails = [...new Set([...this.emails, ...emailsToAdd])];
            this.isRecipient = true;
          }
        }
      }

      reader.readAsText(this.selectedFile);
    }

  }




  onAddEmail(){

    // // (Optional) Custom error
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

      // When the email doesn't exist yet -> add it
      if(filteredArray.length === 0){

        // Update history
        this.addHistory.push([email]);
        this.actionsLog.push('ADD');
        // Add to array        
        this.emails.push(email);
        this.isRecipient = true;
      }
      // else{
      //   this.emailForm.controls['email'].setErrors({exist: 'true'});
      // }
    }
  }


  onDeleteEmail(emailToRemove : string){
    // Delete email from array
    this.emails = this.emails.filter((email, index)=>{
      if(email === emailToRemove) 
      {
        //Update log
        this.actionsLog.push('DELETE');
        // Update history
        this.deleteHistory.push([emailToRemove]);
        // Remember index
        this.deleteFromIndexLog.push(index);

        return false;
      }
      return true;
    })

    // Check that the array is empty -> if so we can't sent the poll
    if(this.emails.length === 0) this.isRecipient = false;
  }


  onDeleteAllEmails(): void{

    if(this.emails.length){
      // Add state before delete to history
      this.deleteHistory.push(this.emails);
      // Remove emails
      this.emails = [];
      this.actionsLog.push("DELETE");
      this.isRecipient = false;
    }
  }


  onReturnEmails(): void{

    // If history isn't empty
    if(this.actionsLog.length){

      // Check last operation in log
      let lastOperation = this.actionsLog[this.actionsLog.length -1];

      if(lastOperation === 'ADD'){
        // If add we have to delete 
        let lastAddEmails = this.addHistory.pop()!;
        let isFind = false; 

        this.emails = this.emails.filter((email) => {

          isFind = false;
          // If curent confused email is in the array of last add emails. If yes -> set isFind and filter out
          lastAddEmails = lastAddEmails.filter((lastAddEmail) => {
            if(email === lastAddEmail){
              isFind = true; 
              return false;
            }
            return true;
          });
          // If the email was in the array -> filter out
          if(isFind) return false;
          else return true; 
        });

        if(this.emails.length === 0){
          this.isRecipient = false;
        }

      }
      else if(lastOperation === 'DELETE'){
        // If remove we have to add
        let lastDeleteEmails = this.deleteHistory.pop()!;

        // If it was single deletion
        if(lastDeleteEmails.length === 1){
          this.emails.splice(this.deleteFromIndexLog.pop()!, 0, lastDeleteEmails[0]);
        }
        // If it was all deletion
        else{
          this.emails = lastDeleteEmails;
        }

        this.isRecipient = true;
      }

      // Delete last log
      this.actionsLog.pop();
    }
  }
}


