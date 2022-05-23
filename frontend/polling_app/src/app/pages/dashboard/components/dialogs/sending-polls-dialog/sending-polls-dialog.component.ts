import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailMessage } from 'src/app/models/dashboard-models/emailMessage';
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
                private snackBar: MatSnackBar) {}

  emails : string[] = [];
  isSubject: boolean = false;
  isRecipient: boolean = false;
  selectedFile: any = null;
  history: string[][] = [];
  historySize: number = 10; 

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

  getEmailErrorMessage(): string{

    if(this.emailForm.controls['email'].hasError('email')){
      return "Email jest niepoprawny!";
    }

    else if(this.emailForm.controls['email'].hasError('noEmailInCsv')){
      return "W podanym pliku nie znaleziono adresów email!";
    }

    else if(this.emailForm.controls['email'].hasError('emailExist')){
      return "Podany email został już dodany!"
    }

    else if(this.emailForm.controls['email'].hasError('incorrectCsv')){
      return "Plik CSV jest niepoprawny!"
    }

    else if(this.emailForm.controls['email'].hasError('incorrectEmailsInCsv')){
      return `Nie wszystkie adresy były poprawne!`;
    }

    return "";
  }


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
    let emailMessage: EmailMessage;

    // If message is empty set property to null
    if(message === ""){
      emailMessage = new EmailMessage(subject, null, this.data.pollSlug, this.emails);
    }
    else{
      emailMessage = new EmailMessage(subject, message, this.data.pollSlug, this.emails);
    }
    
    this.mailService.postMail(emailMessage).subscribe({
      // If success
      next: () => {
        this.onSnackbarOpen();
      },
      // If error
      error: (err) => {
        console.log(err);
      }
    });
  }


  onFileSelected(event: any): void {

    // Discard previous errors
    this.emailForm.controls['email'].updateValueAndValidity();  

    this.selectedFile = event.target.files[0];    

    if(this.selectedFile !== null){
      const reader = new FileReader();
      reader.onload = (e) => {

        const str = e.target!.result?.toString();

        const numberOfColumns = str!.slice(0, str!.indexOf("\n")).split(",").length;        

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

        let emailsIndex: number = -1;
        let emailRegex: RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        
        // Looking for email in row (some() - if any iterations returns true -> break)
        let isEmail = trimedFields.some((field, index) => {

            if(field.match(emailRegex)){
              emailsIndex = index;
              return true;
            }
            return false;
        }) 

        if(isEmail){
          let rowFields: string[] = [];
          let emailsToAdd: string[] = [];
          let incorrectEmails: boolean = false;
          // Adding emails
          rows.some((row) => {

            // Prevent empty lines under data
            if(row !== ""){

              rowFields = row.split(new RegExp(","));
              // Check that the number of fields is equal to number of columns
              if(rowFields.length !== numberOfColumns){
                this.emailForm.controls['email'].setValue("");
                this.emailForm.controls['email'].setErrors({incorrectCsv : true});
                this.emailForm.controls['email'].markAsTouched();
                return true;
              }

              let email = rowFields[emailsIndex].trim();

              if(email.match(emailRegex)){
                emailsToAdd.push(email);
              }
              else{
                incorrectEmails = true;
              }
            }
            return false;
          })          

          if(incorrectEmails){
            this.emailForm.controls['email'].setValue("");
            this.emailForm.controls['email'].setErrors({'incorrectEmailsInCsv' : true});
            this.emailForm.controls['email'].markAsTouched();
          }

          if(!this.emailForm.controls['email'].hasError('incorrectCsv')){
            // Store previous state
            this.addToHistory(this.emails);
            // Add emails
            this.emails = [...new Set([...this.emails, ...emailsToAdd])];
            this.isRecipient = true;
          }
        }
        else{          
          // Get error that csv doesn't include emails
          this.emailForm.controls['email'].setValue("");
          this.emailForm.controls['email'].setErrors({noEmailInCsv: true});
          this.emailForm.controls['email'].markAsTouched();
        }
      }

      reader.readAsText(this.selectedFile);
    }

  }

  addToHistory(emails : string[]){

    if(this.history.length === this.historySize){
      // Delete first element
      this.history.shift();
    }
    // Add new element at end
    this.history.push(emails);
  }


  onAddEmail(){

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

        // Store previous state
        this.addToHistory([...this.emails]);
        // Add email       
        this.emails.push(email);
        this.isRecipient = true;
        // Clear input
        this.emailForm.controls['email'].setValue("");
      }
      else{
        // Set error that computed email exists
        this.emailForm.controls['email'].setErrors({emailExist : true});
      }
    }
  }


  onDeleteEmail(emailToRemove : string){

    // Store previous state
    this.addToHistory(this.emails);
    // Delete email from array
    this.emails = this.emails.filter((email, index)=>{
      if(email === emailToRemove) return false;
      return true;
    })

    // Check that the array is empty -> if so we can't sent the poll
    if(this.emails.length === 0) this.isRecipient = false;
  }


  onDeleteAllEmails(): void{

    if(this.emails.length){

      // Add state to history before delete 
      this.addToHistory(this.emails);

      // Remove emails
      this.emails = [];
      this.isRecipient = false;
    }
  }

  onReturnEmails(): void{        
    // If history isn't empty
    if(this.history.length){      
      // Return previous state
      this.emails = this.history.pop()!;

      // Check that recipients exist
      if(this.emails!.length){
        this.isRecipient = true;
      }
      else{
        this.isRecipient = false; 
      }
    }
  }
  
}

